import url from 'url';
import { isIP } from './regexes.js';

const getProxyType = string => {
    try {
        const first = /^(?:(\w+)(?::(\w+))?@)?((?:\d{1,3})(?:\.\d{1,3}){3})(?::(\d{1,5}))?$/.exec(string);

        if (first) {
            const log = first[1];
            const pass = first[2];

            return {
                type: 'v4',
                auth: log && pass ? `${log}:${pass}` : 'none',
                host: first[3],
                port: Number(first[4])
            };
        }

        const second = url.parse(!string.startsWith('http') ? `http://${string}` : string);

        if (second) {
            if (!second.port) {
                const [port, log, pass] = second.path
                    .replaceAll('/', '')
                    .split(':')
                    .filter(item => item.length > 0);

                const nextPort = Number(port);

                if (nextPort >= 0 && nextPort <= 65535) {
                    return {
                        type: isIP(second.hostname) ? 'v4' : 'url',
                        auth: `${log}:${pass}`,
                        host: second.hostname,
                        port: nextPort
                    };
                }

                return null;
            }

            return {
                type: isIP(second.hostname) ? 'v4' : 'url',
                auth: second.auth ? second.auth : 'none',
                host: second.hostname,
                port: Number(second.port)
            };
        }

        return null;
    } catch {
        return null;
    }
};

const findMixedProxies = array => {
    const successed = [];
    const failed = [];

    for (const string of array) {
        const result = getProxyType(string);

        if (result) {
            successed.push(result);
        } else {
            failed.push(string);
        }
    }

    return {
        successed,
        failed
    };
};

export default findMixedProxies;
