import rp from 'request-promise';
import { DEFAULT_IP_SETTINGS } from '../constants/SettingsConstants';

export const getIP = url => {
    try {
        const { lookupUrl } = DEFAULT_IP_SETTINGS;

        return rp.get({ timeout: 10000, url: url ? url : lookupUrl });
    } catch {
        throw new Error('IP lookup failed. Try again later.');
    }
};
