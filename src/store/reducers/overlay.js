import { OVERLAY_IP_CHANGE_LOOKUP_STATUS, OVERLAY_IP_CHANGE_LOOKUP_TO_INITIAL, OVERLAY_JUDGES_CHANGE_STATE, OVERLAY_JUDGE_CHANGE_PING_STATE } from '../../constants/ActionTypes';

const initialState = {
    ip: {
        isActive: false,
        currentIP: '',
        isLookupDone: false,
        isLookupSuccess: false,
        locked: false
    },
    judges: {
        isActive: false,
        locked: false,
        items: []
    }
};

const overlay = (state = initialState, action) => {
    switch (action.type) {
        case OVERLAY_IP_CHANGE_LOOKUP_STATUS:
            return {
                ...state,
                ip: {
                    ...state.ip,
                    ...action.status
                }
            };
        case OVERLAY_IP_CHANGE_LOOKUP_TO_INITIAL:
            return {
                ...state,
                ip: initialState.ip
            };
        case OVERLAY_JUDGES_CHANGE_STATE:
            return {
                ...state,
                judges: {
                    ...state.judges,
                    ...action.state
                }
            };
        case OVERLAY_JUDGE_CHANGE_PING_STATE:
            return {
                ...state,
                judges: {
                    ...state.judges,
                    items: state.judges.items.map(item => {
                        if (item.url == action.url) {
                            return {
                                ...item,
                                ...action.state
                            };
                        }

                        return item;
                    })
                }
            };
        default:
            return state;
    }
};

export default overlay;
