import { initial } from '../../core/settings';
import { BLACKLIST_CHANGE_ITEM_PATH, BLACKLIST_ADD_ITEM, BLACKLIST_REMOVE_ITEM, BLACKLIST_TOGGLE_OPTION, BLACKLIST_SET_ACTIVE_ITEM } from '../../constants/ActionTypes';

const blacklist = (state = initial.blacklist, action) => {
    switch (action.type) {
        case BLACKLIST_CHANGE_ITEM_PATH:
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
        case BLACKLIST_SET_ACTIVE_ITEM:
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
        case BLACKLIST_ADD_ITEM:
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
        case BLACKLIST_REMOVE_ITEM:
            return {
                ...state,
                items: state.items.filter(item => item.title != action.title)
            };
        case BLACKLIST_TOGGLE_OPTION:
            return {
                ...state,
                [action.target]: !state[action.target]
            };
        default:
            return state;
    }
};

export default blacklist;
