import { INPUT_SET_LOADED_FILE_DATA } from '../../constants/ActionTypes';

const initial = {
    loaded: false,
    list: [],
    errors: [],
    total: 0,
    unique: 0,
    name: ''
};

const input = (state = initial, action) => {
    switch (action.type) {
        case INPUT_SET_LOADED_FILE_DATA:
            return {
                ...state,
                ...action.nextState
            };
        default:
            return state;
    }
};

export default input;
