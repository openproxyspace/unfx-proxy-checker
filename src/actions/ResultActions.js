import { getFilteredProxies } from '../store/selectors/getFilteredProxies';
import { writeFile } from 'fs';
import { sort } from 'js-flock';
import { remote } from 'electron';
import {
    RESULT_SHOW,
    RESULT_TOGGLE_ANON,
    RESULT_TOGGLE_PROTOCOL,
    RESULT_TOGGLE_COUNTRY,
    RESULT_TOGGLE_MISC,
    RESULT_SET_SEARCH,
    RESULT_LOAD_MORE,
    RESULT_CLOSE,
    RESULT_TOGGLE_BLACKLIST,
    RESULT_TOGGLE_COUNTRIES,
    RESULT_SET_MAX_TIMEOUT,
    RESULT_CHANGE_PORTS_INPUT,
    RESULT_SET_PORTS_ALLOW,
    RESULT_SORT,
    RESULT_EXPORT_TOGGLE,
    RESULT_EXPORT_CHANGE_TYPE
} from '../constants/ActionTypes';
import { otherChanges } from './CheckingActions';
import { wait } from '../misc/wait';

const { dialog } = remote;

export const getResultsInIpPort = items => {
    let content = '';

    items.forEach(item => {
        content += item.ip + ':' + item.port + '\r\n';
    });

    return content;
};

export const getResultsInProtocolIpPort = items => {
    let content = '';

    items.forEach(item => {
        if (item.protocols.length == 1) {
            if (item.protocols[0] == 'https') {
                content += 'http://' + item.ip + ':' + item.port + '\r\n';
            } else {
                content += item.protocols[0] + '://' + item.ip + ':' + item.port + '\r\n';
            }
        } else {
            if (item.protocols.indexOf('socks5') !== -1) {
                content += 'socks5://' + item.ip + ':' + item.port + '\r\n';
            } else if (item.protocols.indexOf('socks4') !== -1) {
                content += 'socks4://' + item.ip + ':' + item.port + '\r\n';
            } else {
                content += 'http://' + item.ip + ':' + item.port + '\r\n';
            }
        }
    });

    return content;
};

export const save = () => async (dispatch, getState) => {
    const saveType = getState().result.exporting.type == 1 ? getResultsInIpPort : getResultsInProtocolIpPort;

    const { filePath } = await dialog.showSaveDialog({
        filters: [
            {
                name: 'Text Files',
                extensions: ['txt']
            }
        ]
    });

    if (filePath) {
        writeFile(filePath, saveType(getFilteredProxies(getState())), () => {
            dispatch(toggleExport());
        });
    }
};

export const close = () => ({
    type: RESULT_CLOSE
});

const createCountries = items => {
    const countries = {};
    const res = [];

    items.forEach(item => {
        if (countries[item.country.name] == undefined) {
            countries[item.country.name] = {
                count: 1,
                flag: item.country.flag
            };
        } else {
            countries[item.country.name].count++;
        }
    });

    Object.keys(countries).forEach(item => {
        res.push({
            active: true,
            name: item,
            ...countries[item]
        });
    });

    return sort(res).desc(item => item.count);
};

export const showResult = result => async (dispatch, getState) => {
    const {
        core: { timeout }
    } = getState();

    dispatch({
        type: RESULT_SHOW,
        items: result.items,
        countries: createCountries(result.items),
        inBlacklists: result.inBlacklists,
        timeout
    });

    await wait(300);
    dispatch(otherChanges({ opened: false }));
    await wait(300);
    dispatch(otherChanges({ preparing: false }));
};

export const toggleBlacklist = title => ({
    type: RESULT_TOGGLE_BLACKLIST,
    title
});

export const toggleAnon = e => ({
    type: RESULT_TOGGLE_ANON,
    anon: e.target.name
});

export const toggleCountries = () => ({
    type: RESULT_TOGGLE_COUNTRIES
});

export const toggleProtocol = e => ({
    type: RESULT_TOGGLE_PROTOCOL,
    protocol: e.target.name
});

export const toggleMisc = e => ({
    type: RESULT_TOGGLE_MISC,
    misc: e.target.name
});

export const setMaxTimeout = e => ({
    type: RESULT_SET_MAX_TIMEOUT,
    timeout: e.target.value
});

export const onSearchInput = e => ({
    type: RESULT_SET_SEARCH,
    value: e.target.value
});

export const toggleCountry = (name, all, state) => ({
    type: RESULT_TOGGLE_COUNTRY,
    name,
    all,
    state
});

export const loadMore = () => ({
    type: RESULT_LOAD_MORE
});

export const changePortsInput = e => ({
    type: RESULT_CHANGE_PORTS_INPUT,
    input: e.target.value
});

const setPortsAllow = allow => ({
    type: RESULT_SET_PORTS_ALLOW,
    allow
});

export const allowPorts = () => setPortsAllow(true);
export const disallowPorts = () => setPortsAllow(false);

export const sortResults = by => ({
    type: RESULT_SORT,
    by
});

export const toggleExport = () => ({
    type: RESULT_EXPORT_TOGGLE
});

export const changeExportType = e => ({
    type: RESULT_EXPORT_CHANGE_TYPE,
    value: e.target.value
});
