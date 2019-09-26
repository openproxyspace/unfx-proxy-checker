import { getIP } from '../core/ip';
import { wait } from '../misc/wait';
import { isIP } from '../misc/regexes';
import { OVERLAY_IP_CHANGE_LOOKUP_STATUS, OVERLAY_IP_CHANGE_LOOKUP_TO_INITIAL } from '../constants/ActionTypes';
import { setIP } from './IpActions';

export const changeIpLookupStatus = status => ({
    type: OVERLAY_IP_CHANGE_LOOKUP_STATUS,
    status
});

export const toInitialState = () => ({
    type: OVERLAY_IP_CHANGE_LOOKUP_TO_INITIAL
});

export const IpLookup = chainEvent => async (dispatch, getState) => {
    const { ip, overlay } = getState();

    if (overlay.ip.locked) {
        return;
    }

    dispatch(changeIpLookupStatus({ isActive: true, locked: true }));

    const onError = async () => {
        await wait(500);
        dispatch(
            changeIpLookupStatus({
                isLookupDone: true,
                isLookupSuccess: false
            })
        );

        await wait(3000);
        dispatch(changeIpLookupStatus({ isActive: false }));
        await wait(500);
        dispatch(toInitialState());
    };

    try {
        const response = await getIP(ip.lookupUrl);

        if (!isIP(response)) {
            return onError();
        }

        await wait(500);
        dispatch(
            changeIpLookupStatus({
                currentIP: response,
                isLookupDone: true,
                isLookupSuccess: true
            })
        );

        dispatch(setIP(response));

        await wait(1000);
        dispatch(changeIpLookupStatus({ isActive: false }));

        if (chainEvent) {
            chainEvent(response);
        }

        await wait(500);
        dispatch(toInitialState());
    } catch {
        onError();
    }
};
