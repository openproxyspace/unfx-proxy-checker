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
                ...JSON.parse(readFileSync(SETTINGS_FILE_PATH, 'utf8'))
                // ...transformPrevSettings(JSON.parse(readFileSync(SETTINGS_FILE_PATH, 'utf8')))
            };
        } catch (error) {
            return MERGED_DEFAULT_SETTINGS;
        }
    }

    return MERGED_DEFAULT_SETTINGS;
};

// const transformPrevSettings = settings => {
//     const transforms = [
//         {
//             version: '4.1.1',
//             action: input => {
                
//             }
//         }
//     ]
    

//     if (settings.version == undefined) return MERGED_DEFAULT_SETTINGS;

//     if (transforms[settings.version] != undefined) {
//         transforms[settings.version]();
//         return settings;
//     } else {
//         console.log('NOFUFU');
//         return settings;
//     }
// };

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
        main,
        version: currentVersion
    });
});

export const initial = getSettings();
