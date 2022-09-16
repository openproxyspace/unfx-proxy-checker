import { ipcRenderer } from 'electron';
import { BLACKLIST_CHANGE_ITEM_PATH, BLACKLIST_ADD_ITEM, BLACKLIST_REMOVE_ITEM, BLACKLIST_TOGGLE_OPTION, BLACKLIST_SET_ACTIVE_ITEM } from '../constants/ActionTypes';

export const changePath = (title, path) => ({
    type: BLACKLIST_CHANGE_ITEM_PATH,
    title,
    path
});

export const selectPath = title => async dispatch => {
    const path = await ipcRenderer.invoke('choose-path', 'open');

    if (path) {
        dispatch(changePath(title, path));
    }
};

export const add = (title, path) => ({
    type: BLACKLIST_ADD_ITEM,
    title,
    path
});

export const setActive = (title, active) => ({
    type: BLACKLIST_SET_ACTIVE_ITEM,
    title,
    active
});

export const remove = title => ({
    type: BLACKLIST_REMOVE_ITEM,
    title
});

export const toggleOption = e => ({
    type: BLACKLIST_TOGGLE_OPTION,
    target: e.target.name
});
