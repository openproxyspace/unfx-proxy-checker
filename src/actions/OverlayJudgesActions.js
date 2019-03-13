import { OVERLAY_JUDGES_CHANGE_STATE, OVERLAY_JUDGE_CHANGE_PING_STATE } from '../constants/ActionTypes';

export const changeState = state => ({
    type: OVERLAY_JUDGES_CHANGE_STATE,
    state
});

export const startPing = () => (dispatch, getState) => {
    const { judges } = getState();

    const parsejudges = judges.items.filter(item => item.active).map(item => ({
        url: item.url,
        state: {
            checking: true,
            working: false
        }
    }));

    dispatch(changeState({ isActive: true, locked: true, items: parsejudges }));
};

export const changeJudgePingState = (url, state) => ({
    type: OVERLAY_JUDGE_CHANGE_PING_STATE,
    url,
    state
});
