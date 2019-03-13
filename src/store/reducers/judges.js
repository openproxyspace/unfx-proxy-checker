import { initial } from '../../core/settings';
import { CHANGE_JUDGE, ADD_JUDGE, REMOVE_JUDGE, TOGGLE_JUDGES_OPTION } from '../../constants/ActionTypes';

const judges = (state = initial.judges, action) => {
    switch (action.type) {
        case CHANGE_JUDGE:
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
        case ADD_JUDGE:
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
        case REMOVE_JUDGE:
            return {
                ...state,
                items: state.items.filter(item => item.url != action.url)
            };
        case TOGGLE_JUDGES_OPTION:
            return {
                ...state,
                [action.target]: !state[action.target]
            };
        default:
            return state;
    }
};

export default judges;
