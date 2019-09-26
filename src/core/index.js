import { isDev } from '../constants/AppConstants';
import { EventEmitter } from 'events';
import Checker from './checker';

EventEmitter.defaultMaxListeners = 0;

if (!isDev) {
    process.on('uncaughtException', () => null);
}

export default class Core {
    static checker;

    static stop() {
        this.checker.stop();
    }

    static start(proxies, options, judges, checkProtocols, ip, blacklist) {
        this.checker = new Checker(proxies, options, ip, judges, checkProtocols, blacklist);
        this.checker.start();
    }
}
