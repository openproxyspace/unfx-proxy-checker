import rp from 'request-promise';
import { API_CURRENT_STATS_URL } from '../constants/AppConstants';

export const getStats = async (retries = 0) => {
    try {
        const { alive } = await rp.get(API_CURRENT_STATS_URL, { timeout: 5000, json: true });
        return alive.total;
    } catch {
        return retries < 3 ? getStats(++retries) : 0;
    }
};
