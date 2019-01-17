import { CHANGE_UPDATE_STATE, UPDATE_UP_DOWNLOAD_PROGRESS, UPDATE_CLOSE } from '../../constants/ActionTypes';

const initialState = {
    active: true,
    isAvailable: false,
    isChecking: true,
    onDownloading: false,
    downloadProgress: 0,
    info: null
};

const update = (state = initialState, action) => {
    switch (action.type) {
        case CHANGE_UPDATE_STATE:
            return {
                ...state,
                ...action.nextState
            };
        case UPDATE_UP_DOWNLOAD_PROGRESS:
            return {
                ...state,
                downloadProgress: action.percent
            };
        case UPDATE_CLOSE:
            return {
                ...state,
                active: false
            };
        default:
            return state;
    }
};

export default update;
