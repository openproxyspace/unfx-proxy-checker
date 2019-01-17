import { IP_CHANGE_OPTION, IP_SET } from '../constants/ActionTypes';

export const changeOption = e => ({
    type: IP_CHANGE_OPTION,
    target: e.target.name,
    value: e.target.value
});

export const setIP = ip => ({
    type: IP_SET,
    ip
});
