import { CHANGE_INPUT } from '../../constants/ActionTypes';

const input = (state = '', action) => {
    switch (action.type) {
        case CHANGE_INPUT:
            return action.value;
        default:
            return state;
    }
};

export default input;
