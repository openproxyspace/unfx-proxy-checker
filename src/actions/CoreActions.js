import { CORE_CHANGE_OPTION, CORE_TOGGLE_OPTION, CORE_TOGGLE_PROTOCOL } from '../constants/ActionTypes';

export const changeOption = e => ({
    type: CORE_CHANGE_OPTION,
    target: e.target.name,
    value: e.target.value
});

export const toggleOption = e => ({
    type: CORE_TOGGLE_OPTION,
    target: e.target.name
});

export const toggleProtocol = e => ({
    type: CORE_TOGGLE_PROTOCOL,
    protocol: e.target.name
});
