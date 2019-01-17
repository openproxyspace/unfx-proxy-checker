import { remote } from 'electron';
import { CHANGE_BLACKLIST_ITEM_PATH, ADD_BLACKLIST_ITEM, REMOVE_BLACKLIST_ITEM, TOGGLE_BLACKLIST_OPTION, SET_ACTIVE_BLACKLIST_ITEM } from '../constants/ActionTypes';

const { dialog } = remote;

export const changePath = (title, path) => ({
    type: CHANGE_BLACKLIST_ITEM_PATH,
    title,
    path
});

export const selectPath = title => dispatch => {
    let readPath = dialog.showOpenDialog({
        filters: [
            {
                name: 'Text Files',
                extensions: ['txt']
            }
        ]
    });

    if (!readPath) return;
    
    dispatch(changePath(title, readPath[0]));
};

export const add = (title, path) => ({
    type: ADD_BLACKLIST_ITEM,
    title,
    path
});

export const setActive = (title, active) => ({
    type: SET_ACTIVE_BLACKLIST_ITEM,
    title,
    active
});

export const remove = title => ({
    type: REMOVE_BLACKLIST_ITEM,
    title
});

export const toggleOption = e => ({
    type: TOGGLE_BLACKLIST_OPTION,
    target: e.target.name
});
