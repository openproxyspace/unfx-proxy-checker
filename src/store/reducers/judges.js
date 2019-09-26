import { initial } from '../../core/settings';
import { JUDGES_CHANGE, JUDGES_ADD, JUDGES_REMOVE, JUDGES_TOGGLE_OPTION } from '../../constants/ActionTypes';

const judges = (state = initial.judges, action) => {
    switch (action.type) {
        case JUDGES_CHANGE:
            return {
                ...state,
                items: state.items.map(item => {
                    if (item.url == action.url) {
                        return {
                            ...item,
                            ...action.settings
                        };
                    }

                    return item;
                })
            };
        case JUDGES_ADD:
            if (state.items.every(item => item.url != action.url)) {
                return {
                    ...state,
                    items: [
                        ...state.items,
                        {
                            url: action.url,
                            validate: ''
                        }
                    ]
                };
            }

            return state;
        case JUDGES_REMOVE:
            return {
                ...state,
                items: state.items.filter(item => item.url != action.url)
            };
        case JUDGES_TOGGLE_OPTION:
            return {
                ...state,
                [action.target]: !state[action.target]
            };
        default:
            return state;
    }
};

export default judges;
