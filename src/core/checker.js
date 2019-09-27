import rp from 'request-promise';
import store from '../store';
import { lookup } from './country';
import SocksProxyAgent from 'socks-proxy-agent';
import { openChecking, upCounterStatus } from '../actions/CheckingActions';
import { showResult } from '../actions/ResultActions';
import { collar } from 'js-flock';

export default class Checker {
    constructor(proxies, options, ip, judges, targetProtocols, blacklist) {
        this.ip = ip;
        this.doneLevel = targetProtocols.length;
        this.states = {};
        this.stopped = false;
        this.queue = proxies;
        this.judges = judges;
        this.options = options;
        this.blacklist = blacklist;
        this.currentProxy = 0;

        this.initialRequestConfig = {
            time: true,
            timeout: Number(this.options.timeout),
            resolveWithFullResponse: true,
            ...(options.keepAlive ? { headers: { connection: 'keep-alive' } } : {})
        };

        this.counter = {
            all: this.queue.length,
            done: 0,
            protocols: {
                ...(targetProtocols.includes('http') ? { http: 0 } : {}),
                ...(targetProtocols.includes('https') ? { https: 0 } : {}),
                ...(targetProtocols.includes('socks4') ? { socks4: 0 } : {}),
                ...(targetProtocols.includes('socks5') ? { socks5: 0 } : {})
            }
        };

        this.check = this.buildCheck(targetProtocols);

        this.upCounterStatus = setInterval(() => {
            store.dispatch(upCounterStatus(this.counter));
        }, 250);
    }

    initializeProxyState(proxy) {
        this.states[proxy] = {
            doneLevel: 0,
            permanent: {
                anon: 'elite',
                protocols: [],
                timeout: 0,
                ...(this.options.captureServer ? { server: null } : {}),
                ...(this.options.keepAlive ? { keepAlive: false } : {}),
                ...(this.options.captureFullData ? { data: [] } : {})
            }
        };
    }

    async checkProtocol(proxy, protocol, retries = 0) {
        try {
            const url = protocol == 'http' ? this.judges.getUsual() : protocol == 'https' ? this.judges.getSSL() : this.judges.getAny();
            const response = await collar(rp.get(url, { ...this.initialRequestConfig, ...this.getAgent(proxy, protocol) }), this.initialRequestConfig.timeout);

            this.onResponse(response, proxy, protocol);
        } catch ({ statusCode }) {
            this.onError(proxy, protocol, retries, statusCode);
        }
    }

    getAgent(proxy, protocol) {
        if (protocol == 'socks4' || protocol == 'socks5') {
            const agent = new SocksProxyAgent(protocol + '://' + proxy);
            agent.timeout = this.initialRequestConfig.timeout;

            return { agent };
        }

        return { proxy: 'http://' + proxy };
    }

    getServer(body) {
        if (body.match(/squid/i)) {
            return 'squid';
        }

        if (body.match(/mikrotik/i)) {
            return 'mikrotik';
        }

        if (body.match(/tinyproxy/i)) {
            return 'tinyproxy';
        }

        if (body.match(/litespeed/i)) {
            return 'litespeed';
        }

        if (body.match(/varnish/i)) {
            return 'varnish';
        }

        if (body.match(/haproxy/i)) {
            return 'haproxy';
        }

        return null;
    }

    getAnon(body) {
        if (body.match(new RegExp(this.ip))) {
            return 'transparent';
        }

        if (body.match(/HTTP_VIA|PROXY_REMOTE_ADDR/)) {
            return 'anonymous';
        }

        return 'elite';
    }

    setKeepAlive(proxy, headers) {
        if (!this.states[proxy].permanent.keepAlive && (headers['keep-alive'] || headers['connection'] == 'keep-alive')) {
            this.states[proxy].permanent.keepAlive = true;
        }
    }

    onResponse(response, proxy, protocol) {
        if (this.stopped) {
            return;
        }

        if (this.judges.validate(response.body, response.request.href)) {
            this.states[proxy].permanent.timeout = response.elapsedTime;

            let anon = 'elite';

            if (protocol == 'http') {
                anon = this.getAnon(response.body);
                this.states[proxy].permanent.anon = anon;

                if (this.options.captureServer) {
                    this.states[proxy].permanent.server = this.getServer(response.body);
                }
            }

            if (this.options.keepAlive) {
                this.setKeepAlive(proxy, response.headers);
            }

            if (this.options.captureFullData) {
                this.states[proxy].permanent.data.push({
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

            this.states[proxy].permanent.protocols.push(protocol);
            this.counter.protocols[protocol]++;
        }

        this.states[proxy].doneLevel++;
        this.isDone(proxy);
    }

    onError(proxy, protocol, retries, statusCode) {
        if (this.stopped) {
            return;
        }

        if (!statusCode && this.options.retries > 0 && retries < this.options.retries) {
            this.checkProtocol(proxy, protocol, ++retries);
        } else {
            this.states[proxy].doneLevel++;
            this.isDone(proxy);
        }
    }

    buildCheck(protocols) {
        if (protocols.length == 1) {
            return proxy => {
                this.checkProtocol(proxy, protocols[0]);
            };
        }

        if (protocols.length == 4) {
            return proxy => {
                this.checkProtocol(proxy, 'http');
                this.checkProtocol(proxy, 'https');
                this.checkProtocol(proxy, 'socks4');
                this.checkProtocol(proxy, 'socks5');
            };
        }

        return proxy => {
            protocols.forEach(protocol => {
                this.checkProtocol(proxy, protocol);
            });
        };
    }

    getResult() {
        const result = [];

        for (let proxy in this.states) {
            const proxyState = this.states[proxy].permanent;

            if (proxyState.protocols.length > 0) {
                const [ip, port] = proxy.split(':');

                result.push({
                    ip,
                    port: Number(port),
                    country: lookup(ip),
                    ...(this.blacklist ? { blacklist: this.blacklist.check(ip) } : false),
                    ...proxyState
                });
            }
        }

        return {
            items: result,
            inBlacklists: this.blacklist ? this.blacklist.getInListsCounter() : false
        };
    }

    isDone(proxy) {
        if (this.states[proxy].doneLevel == this.doneLevel) {
            this.counter.done++;

            if (this.counter.done == this.counter.all) {
                this.dispatchResult();
            } else {
                this.run();
            }
        }
    }

    run() {
        if (this.currentProxy == this.counter.all) {
            return;
        }

        const proxy = this.queue[this.currentProxy++];

        this.initializeProxyState(proxy);
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
