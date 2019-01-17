import { initial } from '../../core/settings';
import { CHANGE_BLACKLIST_ITEM_PATH, ADD_BLACKLIST_ITEM, REMOVE_BLACKLIST_ITEM, TOGGLE_BLACKLIST_OPTION, SET_ACTIVE_BLACKLIST_ITEM } from '../../constants/ActionTypes';

const blacklist = (state = initial.blacklist, action) => {
    switch (action.type) {
        case CHANGE_BLACKLIST_ITEM_PATH:
            return {
                ...state,
                items: state.items.map(item => {
                    if (item.title == action.title) {
                        return {
                            ...item,
                            path: action.path
                        };
                    }

                    return item;
                })
            };
        case SET_ACTIVE_BLACKLIST_ITEM:
            return {
                ...state,
                items: state.items.map(item => {
                    if (item.title == action.title) {
                        return {
                            ...item,
                            active: action.active
                        };
                    }

                    return item;
                })
            };
        case ADD_BLACKLIST_ITEM:
            if (state.items.every(item => item.title != action.title) && state.items.every(item => item.path != action.path)) {
                return {
                    ...state,
                    items: [
                        ...state.items,
                        {
                            title: action.title,
                            active: true,
                            path: action.path
                        }
                    ]
                };
            }

            return state;
        case REMOVE_BLACKLIST_ITEM:
            return {
                ...state,
                items: state.items.filter(item => item.title != action.title)
            };
        case TOGGLE_BLACKLIST_OPTION:
            return {
                ...state,
                [action.target]: !state[action.target]
            };
        default:
            return state;
    }
};

export default blacklist;
