import Core from '../core';
import Judges from '../core/judges';
import { wait } from '../misc/wait';
import { shuffle } from '../misc/array';
import { isURL, isIP, isPath } from '../misc/regexes';
import { IpLookup } from './OverlayIpActions';
import Blacklist from '../core/blacklist';
import { CHECKING_UP_COUNTER_STATUS, CHECKING_OPEN, CHECKING_OTHER_CHANGES } from '../constants/ActionTypes';

const validateJudges = (judges, targetProtocols) => {
    if (targetProtocols.includes('https') && !judges.some(({ url }) => url.match(/https:\/\//))) {
        throw new Error('You have no judges for HTTPS');
    }

    if (targetProtocols.some(protocol => ['http'].includes(protocol)) && !judges.some(({ url }) => !url.match(/https:\/\//))) {
        throw new Error('You have no judges for HTTP');
    }

    if (judges.filter(({ active }) => active).length == 0) {
        throw new Error('You have no active judges');
    }

    if (judges.every(({ url }) => isURL(url))) {
        return true;
    }

    throw new Error('Judge URL is not correct');
};

const validateBlacklist = items => {
    if (items.every(({ path }) => isURL(path) || isPath(path))) {
        return true;
    }

    throw new Error('Blacklist path must be an local path or URL');
};

const validateInput = list => {
    if (list.length > 0) {
        return true;
    }

    throw new Error('No proxies found');
};

const transformProtocols = protocols => {
    const enabledProtocols = Object.keys(protocols).filter(protocol => protocols[protocol]);

    if (enabledProtocols.length > 0) {
        return enabledProtocols;
    }

    throw new Error('Select protocols');
};

export const start = () => async (dispatch, getState) => {
    try {
        const { core, judges, blacklist, ip, input, checking, overlay } = getState();

        if (overlay.judges.locked || overlay.ip.locked || checking.isOpened) {
            return;
        }

        const protocols = transformProtocols(core.protocols);
        const activeJudges = judges.items.filter(item => item.active);

        validateInput(input.list);
        validateJudges(activeJudges, protocols);

        if (blacklist.filter) {
            validateBlacklist(blacklist.items);
        }

        const proxyList = core.shuffle ? shuffle([...input.list]) : [...input.list];
        const initBlacklist = blacklist.filter ? await new Blacklist(blacklist.items) : false;
        const initJudges = await new Judges({ swap: judges.swap, items: activeJudges }, protocols);

        if (!initJudges) return;

        const chainCheck = ip => Core.start(proxyList, core, initJudges, protocols, ip, initBlacklist);

        if (isIP(ip.current)) {
            chainCheck(ip.current);
        } else {
            dispatch(IpLookup(chainCheck));
        }
    } catch (error) {
        alert(error);
    }
};

export const stop = () => async (dispatch, getState) => {
    const { checking } = getState();

    if (checking.preparing) {
        return;
    }

    dispatch(
        otherChanges({
            preparing: true
        })
    );

    await wait(300);

    Core.stop();
};

export const otherChanges = state => ({
    type: CHECKING_OTHER_CHANGES,
    state
});

export const openChecking = counter => ({
    type: CHECKING_OPEN,
    counter
});

export const upCounterStatus = counter => ({
    type: CHECKING_UP_COUNTER_STATUS,
    counter
});
