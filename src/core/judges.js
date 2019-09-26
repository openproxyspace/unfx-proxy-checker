import rp from 'request-promise';
import store from '../store';
import { changeState, changeJudgePingState, startPing } from '../actions/OverlayJudgesActions';
import { wait } from '../misc/wait';

export default class Judges {
    constructor(config, targetProtocols) {
        this.usingStatus = {
            ssl: {
                current: 0,
                max: null
            },
            usual: {
                current: 0,
                max: null
            },
            any: {
                current: 0,
                max: null
            }
        };

        this.swap = config.swap;
        this.targetProtocols = targetProtocols;

        this.counter = {
            all: config.items.length,
            done: 0
        };

        this.list = {
            ssl: [],
            usual: [],
            any: []
        };

        this.data = {
            // sets on ping response
        };

        return new Promise((resolve, reject) => {
            this.resolve = resolve;
            this.reject = reject;
            this.launch(config.items);
        }).catch(error => alert(error));
    }

    buildGetSSL() {
        if (this.list.ssl.length == 1 || !this.swap) {
            return () => this.list.ssl[0];
        }

        return () => {
            const current = this.list.ssl[this.usingStatus.ssl.current];
            this.usingStatus.ssl.current = this.usingStatus.ssl.current == this.usingStatus.ssl.max - 1 ? 0 : this.usingStatus.ssl.current + 1;

            return current;
        };
    }

    buildGetAny() {
        if (this.list.any.length == 1 || !this.swap) {
            return () => this.list.any[0];
        }

        return () => {
            const current = this.list.any[this.usingStatus.any.current];
            this.usingStatus.any.current = this.usingStatus.any.current == this.usingStatus.any.max - 1 ? 0 : this.usingStatus.any.current + 1;

            return current;
        };
    }

    buildGetUsual() {
        if (this.list.usual.length == 1 || !this.swap) {
            return () => this.list.usual[0];
        }

        return () => {
            const current = this.list.usual[this.usingStatus.usual.current];
            this.usingStatus.usual.current = this.usingStatus.usual.current == this.usingStatus.usual.max - 1 ? 0 : this.usingStatus.usual.current + 1;

            return current;
        };
    }

    validate(body, judge) {
        if (this.data[judge].validate.length > 0) {
            return body.match(new RegExp(this.data[judge].validate));
        }

        return true;
    }

    async launch(list) {
        store.dispatch(startPing());
        await wait(1500);

        for (const judge of list) {
            try {
                const response = await rp.get({ url: judge.url, resolveWithFullResponse: true, time: true, timeout: 10000 });
                this.onSuccess(judge, response);
            } catch {
                this.onError(judge);
            }
        }
    }

    onSuccess(judge, response) {
        const typeLink = judge.url.match(/https:\/\//) ? this.list.ssl : this.list.usual;
        typeLink.push(judge.url);

        this.data[judge.url] = {
            ...judge,
            response
        };

        store.dispatch(
            changeJudgePingState(judge.url, {
                state: {
                    checking: false,
                    working: true,
                    timeout: response.elapsedTime
                }
            })
        );

        this.isDone();
    }

    onError(judge) {
        store.dispatch(
            changeJudgePingState(judge.url, {
                state: {
                    checking: false,
                    working: false
                }
            })
        );

        this.isDone();
    }

    async isDone() {
        this.counter.done++;

        if (this.counter.done == this.counter.all) {
            this.checkAtAliveJudges();

            this.list.any = [...this.list.usual, ...this.list.ssl];

            this.usingStatus.ssl.max = this.list.ssl.length;
            this.usingStatus.usual.max = this.list.usual.length;
            this.usingStatus.any.max = this.list.any.length;

            this.getSSL = this.buildGetSSL();
            this.getUsual = this.buildGetUsual();
            this.getAny = this.buildGetAny();

            await wait(1500);
            store.dispatch(changeState({ isActive: false, locked: false }));

            this.resolve(this);
        }
    }

    checkAtAliveJudges() {
        if (this.isRequiredSSLButNotContains()) {
            this.reject('You have no working SSL judges.');
        }

        if (this.isRequiredUsualButNotContains()) {
            this.reject('You have no working usual judges.');
        }
    }

    isRequiredSSLButNotContains() {
        return this.targetProtocols.includes('https') && this.list.ssl.length == 0;
    }

    isRequiredUsualButNotContains() {
        return this.targetProtocols.some(protocol => ['http'].includes(protocol)) && this.list.usual.length == 0;
    }
}
