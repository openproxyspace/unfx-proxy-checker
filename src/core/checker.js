import rp from 'request-promise';
import store from '../store';
import { lookup } from './country';
import SocksProxyAgent from 'socks-proxy-agent';
import { openChecking, upCounterStatus } from '../actions/CheckingActions';
import { showResult } from '../actions/ResultActions';
import { collar } from 'js-flock';
import { isIP } from '../misc/regexes.js';

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

    initializeProxyState({ type, auth, host, port }) {
        this.states[this.getProxyObjectLink({ type, auth, host, port })] = {
            doneLevel: 0,
            info: {
                type,
                auth,
                host,
                port
            },
            permanent: {
                anon: 'elite',
                ip: null,
                protocols: [],
                timeout: 0,
                ...(this.options.captureServer ? { server: null } : {}),
                ...(this.options.keepAlive ? { keepAlive: false } : {}),
                ...(this.options.captureFullData ? { data: [] } : {})
            }
        };
    }

    getProxyObjectLink({ type, auth, host, port }) {
        return `${type}${auth}${host}${port}`;
    }

    async checkProtocol(proxyObject, protocol, retries = 0) {
        try {
            const judge = protocol === 'http' ? this.judges.getUsual() : protocol === 'https' ? this.judges.getSSL() : this.judges.getAny();
            const response = await collar(rp.get(judge, { ...this.initialRequestConfig, ...this.getAgent(proxyObject, protocol) }), this.initialRequestConfig.timeout);

            this.onResponse(response, proxyObject, protocol, judge);
        } catch ({ statusCode }) {
            this.onError(proxyObject, protocol, retries, statusCode);
        }
    }

    getIp(body) {
        const trimmed = body.trim();

        if (isIP(trimmed)) {
            return trimmed;
        }

        const findIp = /REMOTE_ADDR = (.*)/.exec(trimmed);

        if (isIP(findIp[1])) {
            return findIp[1];
        }

        return null;
    }

    getAgent({ type, auth, host, port }, protocol) {
        if (auth !== 'none') {
            if (protocol === 'socks4' || protocol === 'socks5') {
                const agent = new SocksProxyAgent(`${protocol}://${auth}@${host}:${port}`);
                agent.timeout = this.initialRequestConfig.timeout;

                return { agent };
            }

            return { proxy: `http://${auth}@${host}:${port}` };
        }

        if (protocol === 'socks4' || protocol === 'socks5') {
            const agent = new SocksProxyAgent(`${protocol}://${host}:${port}`);
            agent.timeout = this.initialRequestConfig.timeout;

            return { agent };
        }

        return { proxy: `http://${host}:${port}` };
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

        if (body.match(/HTTP_VIA|PROXY_REMOTE_ADDR/i)) {
            return 'anonymous';
        }

        return 'elite';
    }

    setKeepAlive(proxyLink, headers) {
        if (!this.states[proxyLink].permanent.keepAlive && (headers['keep-alive'] || headers['connection'] === 'keep-alive')) {
            this.states[proxyLink].permanent.keepAlive = true;
        }
    }

    onResponse(response, proxyObject, protocol, judge) {
        if (this.stopped) {
            return;
        }

        const proxyLink = this.getProxyObjectLink(proxyObject);

        if (this.judges.validate(response.body, judge)) {
            this.states[proxyLink].permanent.timeout = response.elapsedTime;
            this.states[proxyLink].permanent.ip = this.getIp(response.body);

            let anon = 'elite';

            if (protocol === 'http') {
                anon = this.getAnon(response.body);
                this.states[proxyLink].permanent.anon = anon;

                if (this.options.captureServer) {
                    this.states[proxyLink].permanent.server = this.getServer(response.body);
                }
            }

            if (this.options.keepAlive) {
                this.setKeepAlive(proxyLink, response.headers);
            }

            if (this.options.captureFullData) {
                this.states[proxyLink].permanent.data.push({
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

            this.states[proxyLink].permanent.protocols.push(protocol);
            this.counter.protocols[protocol]++;
        }

        this.states[proxyLink].doneLevel++;
        this.isDone(proxyLink);
    }

    onError(proxyObject, protocol, retries, statusCode) {
        if (this.stopped) {
            return;
        }

        const proxyLink = this.getProxyObjectLink(proxyObject);

        if (!statusCode && this.options.retries > 0 && retries < this.options.retries) {
            this.checkProtocol(proxyObject, protocol, ++retries);
        } else {
            this.states[proxyLink].doneLevel++;
            this.isDone(proxyLink);
        }
    }

    buildCheck(protocols) {
        if (protocols.length === 1) {
            return proxyObject => {
                this.checkProtocol(proxyObject, protocols[0]);
            };
        }

        if (protocols.length === 4) {
            return proxyObject => {
                this.checkProtocol(proxyObject, 'http');
                this.checkProtocol(proxyObject, 'https');
                this.checkProtocol(proxyObject, 'socks4');
                this.checkProtocol(proxyObject, 'socks5');
            };
        }

        return proxyObject => {
            protocols.forEach(protocol => {
                this.checkProtocol(proxyObject, protocol);
            });
        };
    }

    getResult() {
        const result = [];

        for (let proxy in this.states) {
            const { type, host, port, auth } = this.states[proxy].info;
            const proxyState = this.states[proxy].permanent;
            const country = lookup(proxyState.ip);

            if (proxyState.protocols.length > 0) {
                result.push({
                    type,
                    host,
                    port,
                    auth,
                    country,
                    ...(this.blacklist ? { blacklist: this.blacklist.check(host) } : false),
                    ...proxyState
                });
            }
        }

        return {
            items: result,
            inBlacklists: this.blacklist ? this.blacklist.getInListsCounter() : false
        };
    }

    isDone(proxyLink) {
        if (this.states[proxyLink].doneLevel === this.doneLevel) {
            this.counter.done++;

            if (this.counter.done === this.counter.all) {
                this.dispatchResult();
            } else {
                this.run();
            }
        }
    }

    run() {
        if (this.currentProxy === this.counter.all) {
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
