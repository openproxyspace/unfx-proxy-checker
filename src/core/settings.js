import store from '../store';
import { remote } from 'electron';
import { writeFile, readFileSync, existsSync } from 'fs';
import { SETTINGS_FILE_PATH, MERGED_DEFAULT_SETTINGS } from '../constants/SettingsConstants';
import { currentVersion } from './updater';

export const saveSettings = setting => {
    writeFile(SETTINGS_FILE_PATH, JSON.stringify(setting, null, 4), () => null);
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

    if (settings.version == undefined) return MERGED_DEFAULT_SETTINGS;

    if (settings.version < currentVersion) {
        return transforms.filter(({ version }) => version > settings.version).reduce((prev, { action }) => action(prev), settings);
    } else {
        return settings;
    }
};

remote.getCurrentWindow().on('close', () => {
    const { core, judges, ip, blacklist, result, main } = store.getState();

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
        },
        main: {
            dark: main.dark
        },
        version: currentVersion
    });
});

export const initial = getSettings();
