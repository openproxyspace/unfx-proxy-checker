import { JUDGES_CHANGE, JUDGES_ADD, JUDGES_REMOVE, JUDGES_TOGGLE_OPTION } from '../constants/ActionTypes';

export const change = (url, settings) => ({
    type: JUDGES_CHANGE,
    url,
    settings
});

export const add = url => ({
    type: JUDGES_ADD,
    url
});

export const remove = url => ({
    type: JUDGES_REMOVE,
    url
});

export const toggleOption = e => ({
    type: JUDGES_TOGGLE_OPTION,
    target: e.target.name
});
