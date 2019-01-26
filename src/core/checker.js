import rp from 'request-promise';
import store from '../store';
import ProxyAgent from 'proxy-agent';
import { lookup } from './country';
import { openChecking, upCounterStatus } from '../actions/CheckingActions';
import { showResult } from '../actions/ResultActions';

export default class Checker {
    constructor(proxies, options, ip, judges, checkProtocols, blacklist) {
        this.checkProtocols = checkProtocols;
        this.doneLevel = checkProtocols.length;
        this.tempStates = {
            // for temporary check states
            // this.initTempState()
        };

        this.judges = judges;
        this.blacklist = blacklist;

        this.ip = ip;
        this.stopped = false;
        this.queue = proxies;
        this.options = options;
        this.counter = this.initCounter();

        this.initialRequestConfig = {
            time: true,
            timeout: this.options.timeout,
            resolveWithFullResponse: true,
            ...(options.keepAlive ? { headers: { connection: 'keep-alive' } } : {})
        };

        this.checkAt = {
            http: async (proxy, retry) => {
                try {
                    const response = await rp.get({ ...this.initialRequestConfig, url: this.judges.getUsual(), agent: this.getAgentConfig('http://', proxy) });
                    this.onResponse(response, proxy, 'http');
                } catch (error) {
                    this.onError(proxy, 'http', retry);
                }
            },
            https: async (proxy, retry) => {
                try {
                    const response = await rp.get({ ...this.initialRequestConfig, url: this.judges.getSSL(), agent: this.getAgentConfig('http://', proxy) });
                    this.onResponse(response, proxy, 'https');
                } catch (error) {
                    this.onError(proxy, 'https', retry);
                }
            },
            socks4: async (proxy, retry) => {
                try {
                    const response = await rp.get({ ...this.initialRequestConfig, url: this.judges.getUsual(), agent: this.getAgentConfig('socks4://', proxy) });
                    this.onResponse(response, proxy, 'socks4');
                } catch (error) {
                    this.onError(proxy, 'socks4', retry);
                }
            },
            socks5: async (proxy, retry) => {
                try {
                    const response = await rp.get({ ...this.initialRequestConfig, url: this.judges.getUsual(), agent: this.getAgentConfig('socks5://', proxy) });
                    this.onResponse(response, proxy, 'socks5');
                } catch (error) {
                    this.onError(proxy, 'socks5', retry);
                }
            }
        };

        this.check = this.buildCheck(this.checkProtocols);

        this.upCounterStatus = setInterval(() => {
            store.dispatch(upCounterStatus(this.counter));
        }, 250);
    }

    initCounter() {
        let counter = {
            all: this.queue.length,
            done: 0,
            protocols: {}
        };

        this.checkProtocols.forEach(protocol => (counter.protocols[protocol] = 0));
        return counter;
    }

    initTempState(proxy) {
        this.tempStates[proxy] = {
            timeouts: [],
            anon: 'unknown',
            doneLevel: 0,
            protocols: [],
            extra: false,
            keepAlive: false,
            data: []
        };
    }

    isIssetExtraData(body) {
        let data = [];

        if (body.match(/squid/i)) {
            data.push({ title: 'Squid', description: 'Server software' });
        }

        if (body.match(/ubuntu/i)) {
            data.push({ title: 'Ubuntu', description: 'Server OS' });
        }

        if (body.match(/centos/i)) {
            data.push({ title: 'Centos', description: 'Server OS' });
        }

        if (body.match(/mikrotik/i)) {
            data.push({ title: 'Mikrotik', description: 'Server software' });
        }

        if (body.match(/apache/i)) {
            data.push({ title: 'Apache', description: 'Server software' });
        }

        if (body.match(/nginx/i)) {
            data.push({ title: 'Nginx', description: 'Server software' });
        }

        return data.length > 0 ? data : false;
    }

    getAnon(body) {
        if (body.match(new RegExp(this.ip))) {
            return 'transparent';
        }

        if (body.match(/HTTP_VIA/)) {
            return 'anonymous';
        }

        return 'elite';
    }

    setAnon(proxy, anon) {
        const anonWeights = {
            transparent: 4,
            anonymous: 3,
            elite: 2,
            unknown: 1
        };

        if (anonWeights[anon] > anonWeights[this.tempStates[proxy].anon]) {
            this.tempStates[proxy].anon = anon;
        }
    }

    setKeepAlive(proxy, headers) {
        if (!this.tempStates[proxy].keepAlive && headers['keep-alive']) {
            this.tempStates[proxy].keepAlive = true;
        }
    }

    onResponse(response, proxy, protocol) {
        if (this.stopped) {
            return;
        }

        if (this.judges.validate(response.body, response.request.href)) {
            const anon = this.getAnon(response.body);

            if (this.options.captureExtraData) {
                const extra = this.isIssetExtraData(response.body);

                if (extra) {
                    this.tempStates[proxy].extra = extra;
                }
            }

            this.tempStates[proxy].timeouts.push(response.elapsedTime);
            this.tempStates[proxy].protocols.push(protocol);
            this.setAnon(proxy, anon);

            if (this.options.keepAlive) {
                this.setKeepAlive(proxy, response.headers);
            }

            if (this.options.captureFullData) {
                this.tempStates[proxy].data.push({
                    protocol,
                    timings: response.timings,
                    anon,
                    judge: response.request.href,
                    response: {
                        body: response.body,
                        headers: response.headers
                    }
                });
            }

            this.counter.protocols[protocol]++;
        }

        this.tempStates[proxy].doneLevel++;
        this.isDone(proxy);
    }

    onError(proxy, protocol, retry) {
        if (this.stopped) {
            return;
        }

        if (!retry && this.options.retry) {
            return this.checkAt[protocol](proxy, true);
        }

        this.tempStates[proxy].doneLevel++;
        this.isDone(proxy);
    }

    getAgentConfig(scheme, proxy) {
        let agent = new ProxyAgent(scheme + proxy);
        agent.timeout = this.options.timeout;

        return agent;
    }

    buildCheck(protocols) {
        if (protocols.length == 1) {
            return this.checkAt[protocols[0]];
        }

        if (protocols.length == 4) {
            const all = proxy => {
                this.checkAt.http(proxy);
                this.checkAt.https(proxy);
                this.checkAt.socks4(proxy);
                this.checkAt.socks5(proxy);
            };

            return all;
        }

        const other = proxy => {
            protocols.forEach(protocol => {
                this.checkAt[protocol](proxy);
            });
        };

        return other;
    }

    getResult() {
        const result = [];
        const calcTimeout = timeouts => (timeouts.length > 1 ? Math.floor(timeouts.reduce((a, b) => a + b) / timeouts.length) : timeouts[0]);

        for (let proxy in this.tempStates) {
            if (this.tempStates[proxy].protocols.length > 0) {
                const [ip, port] = proxy.split(':');

                result.push({
                    ip,
                    port: Number(port),
                    timeout: calcTimeout(this.tempStates[proxy].timeouts),
                    anon: this.tempStates[proxy].anon,
                    protocols: this.tempStates[proxy].protocols,
                    country: lookup(ip),
                    extra: this.tempStates[proxy].extra,
                    data: this.tempStates[proxy].data,
                    keepAlive: this.tempStates[proxy].keepAlive,
                    blacklist: this.blacklist ? this.blacklist.check(ip) : false
                });
            }
        }

        delete this.tempStates;

        return {
            items: result,
            inBlacklists: this.blacklist ? this.blacklist.getInListsCounter() : false
        };
    }

    isDone(proxy) {
        if (this.tempStates[proxy].doneLevel == this.doneLevel) {
            this.counter.done++;

            if (this.counter.done == this.counter.all) {
                this.dispatchResult();
            } else {
                this.run();
            }
        }
    }

    run() {
        if (!this.queue.length) {
            return;
        }

        const proxy = this.queue.pop();
        this.initTempState(proxy);
        this.check(proxy);
    }

    dispatchResult() {
        clearInterval(this.upCounterStatus);
        store.dispatch(showResult(this.getResult()));
    }

    stop() {
        this.stopped = true;
        this.dispatchResult();
    }

    start() {
        store.dispatch(openChecking(this.counter));
        const startThreadsCount = this.queue.length > this.options.threads ? this.options.threads : this.queue.length;

        setTimeout(() => {
            for (let index = 0; index < startThreadsCount; index++) {
                this.run();
            }
        }, 300);
    }
}
