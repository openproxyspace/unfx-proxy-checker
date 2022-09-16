import { createSelector } from 'reselect';
import { sort } from 'fast-sort';

const getItems = state => state.result.items;

const isOnlyKeepAlive = state => state.result.misc.onlyKeepAlive;

const getMaxTimeout = state => (state.result.timeout == state.core.timeout ? false : state.result.timeout);

const getCurrentSorting = state => state.result.sorting;

const getProtocols = state => {
    const protocols = state.result.protocols;
    const result = Object.keys(protocols).filter(item => protocols[item]);

    return result.length == 4 ? false : result;
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

    return result.length == 3 ? false : result;
};

const getCountries = state => {
    const countries = state.result.countries.items;
    const count = countries.length;
    const result = countries.filter(item => item.active).map(item => item.name);

    return count == result.length ? false : result;
};

const getSearch = state => {
    const input = state.result.search;

    if (input.length == 0) return false;

    return input
        .toLowerCase()
        .split(/[\s,]+/)
        .filter(item => item.length > 0);
};

const getPorts = state => {
    const { input, allow } = state.result.ports;

    if (input.length == 0) return false;

    const ports = input
        .split(',')
        .map(item => Number(item.replace(' ', '')))
        .filter(item => item > 0);

    return {
        ports,
        allow
    };
};

const arrayContainsArray = (superset, subset) => {
    if (0 === subset.length || !superset) {
        return false;
    }

    return subset.some(value => superset.indexOf(value) !== -1);
};

const filter = (items, protocols, anons, countries, search, isKeepAlive, inBlacklists, maxTimeout, ports, sorting) => {
    let next = maxTimeout ? items.filter(item => item.timeout <= maxTimeout) : items;

    if (search) {
        next = next.filter(
            item =>
                arrayContainsArray(item.ip, search) ||
                arrayContainsArray(item.port.toString(), search) ||
                arrayContainsArray(item.country.name.toLowerCase(), search) ||
                arrayContainsArray(item.country.city.toLowerCase(), search) ||
                arrayContainsArray(item.server, search)
        );
    }

    if (protocols) next = next.filter(item => protocols.some(value => item.protocols.includes(value)));
    if (anons) next = next.filter(item => anons.includes(item.anon));
    if (countries) next = next.filter(item => countries.includes(item.country.name));
    if (isKeepAlive) next = next.filter(item => item.keepAlive);
    if (ports) next = ports.allow ? next.filter(item => filterPorts(item.port, ports.ports)) : next.filter(item => !filterPorts(item.port, ports.ports));

    if (inBlacklists === 'disallow-all') {
        next = next.filter(item => !item.blacklist);
    } else if (inBlacklists !== 'allow-all') {
        next = next.filter(item => !item.blacklist || !inBlacklists.some(value => item.blacklist.includes(value)));
    }

    return sortFilter(next, sorting);
};

const filterPorts = (proxyPort, inputPorts) => inputPorts.some(value => value == proxyPort);

const sortFilter = (items, sorting) => {
    switch (sorting.by) {
        case 'timeout':
            return sorting.reverse ? sort(items).desc(item => item.timeout) : sort(items).asc(item => item.timeout);
        case 'blacklist':
            return sorting.reverse ? sort(items).desc(item => item.blacklist.length) : sort(items).asc(item => (item.blacklist == false ? -1 : 1));
        case 'server':
            return sorting.reverse ? sort(items).desc(item => item.server) : sort(items).asc(item => item.server);
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

export const getFilteredProxies = createSelector(getItems, getProtocols, getAnons, getCountries, getSearch, isOnlyKeepAlive, getInBlacklists, getMaxTimeout, getPorts, getCurrentSorting, filter);
