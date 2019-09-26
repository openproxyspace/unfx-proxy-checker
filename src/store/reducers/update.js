import { UPDATE_CHANGE_STATE } from '../../constants/ActionTypes';

const initialState = {
    active: true,
    isChecking: true
};

const update = (state = initialState, action) => {
    switch (action.type) {
        case UPDATE_CHANGE_STATE:
            return {
                ...state,
                ...action.nextState
            };
        default:
            return state;
    }
};

export default update;
