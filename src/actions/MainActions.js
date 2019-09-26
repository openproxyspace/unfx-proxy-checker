import { MAIN_TOGGLE_DARK, MAIN_SET_STATS } from '../constants/ActionTypes';
import { getStats } from '../core/stats';

export const toggleDark = () => ({
    type: MAIN_TOGGLE_DARK
});

export const setFooterStats = () => async dispatch => {
    const stats = await getStats();

    dispatch({
        type: MAIN_SET_STATS,
        stats
    });
};
