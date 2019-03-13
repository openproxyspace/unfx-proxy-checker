import store from '../store';
import { remote } from 'electron';
import { writeFile, readFileSync, existsSync } from 'fs';
import { SETTINGS_FILE_PATH, MERGED_DEFAULT_SETTINGS } from '../constants/SettingsConstants';

export const saveSettings = setting => {
    writeFile(SETTINGS_FILE_PATH, JSON.stringify(setting, null, 4), () => null);
};

const getSettings = () => {
    if (existsSync(SETTINGS_FILE_PATH)) {
        try {
            return {
                ...MERGED_DEFAULT_SETTINGS,
                ...JSON.parse(readFileSync(SETTINGS_FILE_PATH, 'utf8'))
            };
        } catch (error) {
            return MERGED_DEFAULT_SETTINGS;
        }
    }

    return MERGED_DEFAULT_SETTINGS;
};

export const initial = getSettings();

remote.getCurrentWindow().on('close', () => {
    const { core, judges, ip, blacklist, result } = store.getState();

    saveSettings({
        core,
        judges: {
            ...judges,
            items: judges.items.map(judge => ({
                ...judge,
                validate: judge.validate.toString()
            }))
        },
        ip: {
            lookupUrl: ip.lookupUrl
        },
        blacklist,
        exporting: {
            type: result.exporting.type
        }
    });
});
