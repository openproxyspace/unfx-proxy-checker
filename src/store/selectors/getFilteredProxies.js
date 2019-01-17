import { createSelector } from 'reselect';
import { sort } from 'js-flock';

const getItems = state => state.result.items;

const isOnlyKeepAlive = state => state.result.misc.onlyKeepAlive;

const getMaxTimeout = state => state.result.timeout.max;

const getCurrentSorting = state => state.result.sorting;

const getProtocols = state => {
    const protocols = state.result.protocols;
    const result = Object.keys(protocols).filter(item => protocols[item]);

    return result.length == 4 ? 'all' : result;
};

const getInBlacklists = state => {
    const inLists = state.result.inBlacklists;
    if (!inLists) return 'allow-all';
    const result = inLists.filter(item => !item.active).map(item => item.title);
    return inLists.length == result.length ? 'disallow-all' : result.length == 0 ? 'allow-all' : result;
};

const getAnons = state => {
    const anons = state.result.anons;
    const result = Object.keys(anons).filter(item => anons[item]);

    return result.length == 3 ? 'all' : result;
};

const getCountries = state => {
    const countries = state.result.countries.items;
    const count = countries.length;
    const result = countries.filter(item => item.active).map(item => item.name);

    return count == result.length ? 'all' : result;
};

const getSearch = state => {
    const input = state.result.search;

    if (input.length == 0) {
        return false;
    }

    return input
        .toLowerCase()
        .split(/[\s,]+/)
        .filter(item => item.length > 0);
};

const getPorts = state => {
    const { input, allow } = state.result.ports;

    if (input.length == 0) {
        return false;
    }

    const ports = input
        .split(',')
        .map(item => Number(item.replace(' ', '')))
        .filter(item => item > 0);

    return {
        ports,
        allow
    };
};

const filter = (items, protocols, anons, countries, search, isKeepAlive, inBlacklists, maxTimeout, ports, sorting) => {
    let next = items
        .filter(item => protocols == 'all' || arrayContainsArray(protocols, item.protocols))
        .filter(item => anons == 'all' || arrayContainsArray(item.anon, anons))
        .filter(item => countries == 'all' || arrayContainsArray(item.country.name, countries))
        .filter(item => item.timeout <= maxTimeout);

    if (isKeepAlive) {
        next = next.filter(item => item.keepAlive);
    }

    if (search) {
        next = next.filter(
            item =>
                arrayContainsArray(item.ip, search) ||
                arrayContainsArray(item.port.toString(), search) ||
                arrayContainsArray(item.country.name.toLowerCase(), search) ||
                arrayContainsArray(item.country.city.toLowerCase(), search)
        );
    }

    if (ports) {
        next = ports.allow ? next.filter(item => containsPorts(item.port, ports.ports)) : next.filter(item => !containsPorts(item.port, ports.ports));
    }

    if (inBlacklists === 'disallow-all') {
        next = next.filter(item => !item.blacklist);
    } else if (inBlacklists !== 'allow-all') {
        next = next.filter(item => !item.blacklist || !arrayContainsArray(inBlacklists, item.blacklist));
    }

    return sortFilter(next, sorting);
};

const sortFilter = (items, sorting) => {
    switch (sorting.by) {
        case 'timeout':
            return sorting.reverse ? sort(items).desc(item => item.timeout) : sort(items).asc(item => item.timeout);
        case 'blacklist':
            return sorting.reverse ? sort(items).desc(item => item.blacklist.length) : sort(items).asc(item => (item.blacklist == false ? -1 : 1));
        case 'extra':
            return sorting.reverse ? sort(items).desc(item => item.extra.length) : sort(items).asc(item => (item.extra == false ? -1 : 1));
        case 'keep-alive':
            return sorting.reverse ? sort(items).desc(item => (item.keepAlive ? 1 : -1)) : sort(items).asc(item => (!item.keepAlive ? -1 : 1));
        case 'country':
            return sorting.reverse ? sort(items).desc(item => item.country.name) : sort(items).asc(item => item.country.name);
        case 'anon':
            return sorting.reverse ? sort(items).desc(item => item.anon) : sort(items).asc(item => item.anon);
        case 'protocols':
            if (items.length > 2000) {
                return sorting.reverse ? sort(items).desc(item => item.protocols[0]) : sort(items).asc(item => item.protocols[0]);
            }

            return sorting.reverse ? sort(items).desc(item => item.protocols) : sort(items).asc(item => item.protocols);
        case 'port':
            return sorting.reverse ? sort(items).desc(item => item.port) : sort(items).asc(item => item.port);
        case 'ip':
            return sorting.reverse ? sort(items).desc(item => item.ip) : sort(items).asc(item => item.ip);
    }
};

const arrayContainsArray = (superset, subset) => {
    if (0 === subset.length || !superset) {
        return false;
    }

    return subset.some(value => superset.indexOf(value) !== -1);
};

const containsPorts = (proxyPort, inputPorts) => {
    if (0 === inputPorts.length) {
        return false;
    }

    return inputPorts.some(value => value == proxyPort);
};

export const getFilteredProxies = createSelector(
    getItems,
    getProtocols,
    getAnons,
    getCountries,
    getSearch,
    isOnlyKeepAlive,
    getInBlacklists,
    getMaxTimeout,
    getPorts,
    getCurrentSorting,
    filter
);
