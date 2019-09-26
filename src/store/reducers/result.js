import { initial } from '../../core/settings';
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
} from '../../constants/ActionTypes';

const initialState = {
    isOpened: false,
    items: [],
    misc: {
        onlyKeepAlive: false
    },
    timeout: 0,
    ports: {
        input: '',
        allow: true
    },
    inBlacklists: [],
    countries: {
        active: false,
        items: []
    },
    sorting: {
        reverse: false,
        by: 'timeout'
    },
    anons: {
        transparent: true,
        anonymous: true,
        elite: true
    },
    protocols: {
        http: true,
        https: true,
        socks4: true,
        socks5: true
    },
    countOfResults: 25,
    search: '',
    exporting: {
        active: false,
        ...initial.exporting
    }
};

const result = (state = initialState, action) => {
    switch (action.type) {
        case RESULT_SHOW:
            return {
                ...state,
                isOpened: true,
                items: action.items,
                countries: {
                    active: state.countries.active,
                    items: action.countries
                },
                inBlacklists: action.inBlacklists,
                timeout: action.timeout
            };
        case RESULT_CHANGE_PORTS_INPUT:
            return {
                ...state,
                countOfResults: 25,
                ports: {
                    ...state.ports,
                    input: action.input
                }
            };
        case RESULT_SORT:
            return {
                ...state,
                countOfResults: 25,
                sorting: {
                    reverse: !state.sorting.reverse,
                    by: action.by
                }
            };
        case RESULT_SET_PORTS_ALLOW:
            return {
                ...state,
                countOfResults: 25,
                ports: {
                    ...state.ports,
                    allow: action.allow
                }
            };
        case RESULT_TOGGLE_ANON:
            return {
                ...state,
                countOfResults: 25,
                anons: {
                    ...state.anons,
                    [action.anon]: !state.anons[action.anon]
                }
            };
        case RESULT_TOGGLE_PROTOCOL:
            return {
                ...state,
                countOfResults: 25,
                protocols: {
                    ...state.protocols,
                    [action.protocol]: !state.protocols[action.protocol]
                }
            };
        case RESULT_TOGGLE_COUNTRY:
            if (action.all) {
                return {
                    ...state,
                    countOfResults: 25,
                    countries: {
                        active: state.countries.active,
                        items: state.countries.items.map(item => {
                            return {
                                ...item,
                                active: action.state
                            };
                        })
                    }
                };
            }

            return {
                ...state,
                countOfResults: 25,
                countries: {
                    active: state.countries.active,
                    items: state.countries.items.map(item => {
                        if (item.name == action.name) {
                            return {
                                ...item,
                                active: action.state
                            };
                        }

                        return item;
                    })
                }
            };
        case RESULT_TOGGLE_COUNTRIES:
            return {
                ...state,
                countries: {
                    ...state.countries,
                    active: !state.countries.active
                }
            };
        case RESULT_SET_MAX_TIMEOUT:
            return {
                ...state,
                countOfResults: 25,
                timeout: action.timeout
            };
        case RESULT_TOGGLE_MISC:
            return {
                ...state,
                countOfResults: 25,
                misc: {
                    ...state.misc,
                    [action.misc]: !state.misc[action.misc]
                }
            };
        case RESULT_SET_SEARCH:
            return {
                ...state,
                countOfResults: 25,
                search: action.value
            };
        case RESULT_LOAD_MORE:
            return {
                ...state,
                countOfResults: state.countOfResults + 25
            };
        case RESULT_CLOSE:
            return initialState;
        case RESULT_TOGGLE_BLACKLIST:
            return {
                ...state,
                countOfResults: 25,
                inBlacklists: state.inBlacklists.map(item => {
                    if (item.title == action.title) {
                        return {
                            ...item,
                            active: !item.active
                        };
                    }

                    return item;
                })
            };
        case RESULT_EXPORT_TOGGLE:
            return {
                ...state,
                exporting: {
                    ...state.exporting,
                    active: !state.exporting.active
                }
            };
        case RESULT_EXPORT_CHANGE_TYPE:
            return {
                ...state,
                exporting: {
                    ...state.exporting,
                    type: action.value
                }
            };
        default:
            return state;
    }
};

export default result;
