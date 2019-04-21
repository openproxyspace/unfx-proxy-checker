import { initial } from '../../core/settings';
import { MAIN_TOGGLE_DARK } from '../../constants/ActionTypes';

const main = (state = initial.main, action) => {
    switch (action.type) {
        case MAIN_TOGGLE_DARK:
            return {
                dark: !state.dark
            };
        default:
            return state;
    }
};

export default main;
