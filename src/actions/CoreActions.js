import { CORE_CHANGE_OPTION, CORE_TOGGLE_OPTION, CORE_TOGGLE_PROTOCOL } from '../constants/ActionTypes';
import { getMaxThreads } from '../misc/other';

export const changeOption = e => ({
    type: CORE_CHANGE_OPTION,
    target: e.target.name,
    value: e.target.value
});

export const toggleOption = e => ({
    type: CORE_TOGGLE_OPTION,
    target: e.target.name
});

export const toggleProtocol = e => (dispatch, getState) => {
    dispatch({
        type: CORE_TOGGLE_PROTOCOL,
        protocol: e.target.name
    });

    const { core } = getState();
    const maxThreads = getMaxThreads(core.protocols);

    if (core.threads > maxThreads) {
        dispatch(
            changeOption({
                target: {
                    name: 'threads',
                    value: maxThreads
                }
            })
        );
    }
};
