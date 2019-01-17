import { CHANGE_JUDGE, ADD_JUDGE, REMOVE_JUDGE, TOGGLE_JUDGES_OPTION } from '../constants/ActionTypes';

export const change = (url, settings) => ({
    type: CHANGE_JUDGE,
    url,
    settings
});

export const add = url => ({
    type: ADD_JUDGE,
    url
});

export const remove = url => ({
    type: REMOVE_JUDGE,
    url
});

export const toggleOption = e => ({
    type: TOGGLE_JUDGES_OPTION,
    target: e.target.name
});
