import { initial } from '../../core/settings';
import { IP_CHANGE_OPTION, IP_SET } from '../../constants/ActionTypes';

const ip = (state = initial.ip, action) => {
    switch (action.type) {
        case IP_CHANGE_OPTION:
            return {
                ...state,
                [action.target]: action.value
            };
        case IP_SET:
            return {
                ...state,
                current: action.ip
            };
        default:
            return state;
    }
};

export default ip;
