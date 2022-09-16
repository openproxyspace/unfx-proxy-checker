import store from '../store';
import { readFileSync, existsSync } from 'fs';
import { SETTINGS_FILE_PATH, MERGED_DEFAULT_SETTINGS } from '../constants/SettingsConstants';
import { currentVersion } from './updater';
import { rename, writeFile } from 'fs/promises';

let timeout;
let prevSettings = '';

export const saveSettings = () => {
    if (timeout) clearTimeout(timeout);

    timeout = setTimeout(async () => {
        const { core, judges, ip, blacklist, result, main } = store.getState();
        const json = JSON.stringify(
            {
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
                    type: result.exporting.type,
                    authType: result.exporting.authType
                },
                main: {
                    dark: main.dark
                },
                version: currentVersion
            },
            null,
            4
        );

        if (prevSettings !== json) {
            await writeFile(SETTINGS_FILE_PATH + '.unfx', json);
            await rename(SETTINGS_FILE_PATH + '.unfx', SETTINGS_FILE_PATH);
            prevSettings = json;
        }
    }, 1000);
};

const getSettings = () => {
    if (existsSync(SETTINGS_FILE_PATH)) {
        try {
            return {
                ...MERGED_DEFAULT_SETTINGS,
                ...transformPrevSettings(JSON.parse(readFileSync(SETTINGS_FILE_PATH, 'utf8')))
            };
        } catch {
            return MERGED_DEFAULT_SETTINGS;
        }
    }

    return MERGED_DEFAULT_SETTINGS;
};

const removeOldPropertyAndAddNew = (object, removeName, { name, value }) => {
    delete object[removeName];

    return { ...object, [name]: value };
};

const transformPrevSettings = settings => {
    const transforms = [
        {
            version: '1.5.3',
            action: input => {
                return {
                    ...input,
                    core: removeOldPropertyAndAddNew(input.core, 'retry', { name: 'retries', value: 0 })
                };
            }
        }
    ];

    if (settings.version === undefined) return MERGED_DEFAULT_SETTINGS;

    if (settings.version < currentVersion) {
        return transforms.filter(({ version }) => version > settings.version).reduce((prev, { action }) => action(prev), settings);
    } else {
        prevSettings = JSON.stringify(settings, null, 4);
        return settings;
    }
};

export const initial = getSettings();
