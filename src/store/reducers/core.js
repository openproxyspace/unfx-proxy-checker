import { initial } from '../../core/settings';
import { CORE_CHANGE_OPTION, CORE_TOGGLE_OPTION, CORE_TOGGLE_PROTOCOL } from '../../constants/ActionTypes';

const core = (state = initial.core, action) => {
    switch (action.type) {
        case CORE_CHANGE_OPTION:
            return {
                ...state,
                [action.target]: action.value
            };
        case CORE_TOGGLE_OPTION:
            return {
                ...state,
                [action.target]: !state[action.target]
            };
        case CORE_TOGGLE_PROTOCOL:
            return {
                ...state,
                protocols: {
                    ...state.protocols,
                    [action.protocol]: !state.protocols[action.protocol]
                }
            };
        default:
            return state;
    }
};

export default core;
