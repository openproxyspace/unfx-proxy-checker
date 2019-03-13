import { getLatestVersionInfo } from '../core/updater';
import { wait } from '../misc/wait';
import { CHANGE_UPDATE_STATE } from '../constants/ActionTypes';

export const checkAtAvailable = () => async dispatch => {
    const details = await getLatestVersionInfo();

    await wait(500);

    if (details) {
        dispatch(
            changeUpdateState({
                isAvailable: true,
                isChecking: false,
                info: details
            })
        );
    } else {
        dispatch(
            changeUpdateState({
                active: false,
                isChecking: false
            })
        );
    }
};

const changeUpdateState = nextState => ({
    type: CHANGE_UPDATE_STATE,
    nextState
});
