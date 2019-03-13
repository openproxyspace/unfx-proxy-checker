import { CHANGE_UPDATE_STATE } from '../../constants/ActionTypes';

const initialState = {
    active: true,
    isAvailable: false,
    isChecking: true,
    info: null
};

const update = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_UPDATE_STATE:
            return {
                ...state,
                ...action.nextState
            };
        default:
            return state;
    }
};

export default update;
