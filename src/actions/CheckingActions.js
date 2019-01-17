import Core from '../core';
import Judges from '../core/judges';
import { uniq } from '../misc/uniq';
import { findProxies, isURL, isIP, isPath } from '../misc/regexes';
import { IpLookup } from './OverlayIpActions';
import { CHECKING_UP_COUNTER_STATUS, CHECKING_OPEN, CHECKING_OTHER_CHANGES } from '../constants/ActionTypes';
import Blacklist from '../core/blacklist';
import { wait } from '../misc/wait';

const validateJudges = (judges, targetProtocols) => {
    if (targetProtocols.includes('https') && !judges.some(item => item.ssl)) {
        throw new Error('You have no judges for HTTPS');
    }

    if (targetProtocols.some(protocol => ['http', 'socks4', 'socks5'].includes(protocol)) && !judges.some(item => !item.ssl)) {
        throw new Error('You have no judges for HTTP/SOCKS4/SOCKS5');
    }

    if (judges.every(item => isURL(item.url))) {
        return true;
    }

    throw new Error('Judge URL is not correct');
};

const validateBlacklist = items => {
    if (items.every(item => isURL(item.path) || isPath(item.path))) {
        return true;
    }

    throw new Error('Blacklist path must be an local path or URL');
};

const transformProtocols = protocols => {
    const enabledProtocols = Object.keys(protocols).filter(protocol => protocols[protocol]);

    if (enabledProtocols.length > 0) {
        return enabledProtocols;
    }

    throw new Error('Select protocols');
};

const parseInputProxies = list => {
    try {
        return uniq(findProxies(list));
    } catch (error) {
        throw new Error('No proxies found');
    }
};

export const start = () => async (dispatch, getState) => {
    try {
        const { core, judges, blacklist, ip, input, checking, overlay } = getState();

        if (overlay.judges.locked || overlay.ip.locked || checking.isOpened) {
            return;
        }

        const proxies = parseInputProxies(input);
        const protocols = transformProtocols(core.protocols);

        validateJudges(judges.items, protocols);

        if (blacklist.filter) {
            validateBlacklist(blacklist.items);
        }

        const initJudges = await new Judges(judges, protocols);
        const initBlacklist = blacklist.filter ? await new Blacklist(blacklist.items) : false;
        const chainCheck = ip => Core.start(proxies, core, initJudges, protocols, ip, initBlacklist);

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
