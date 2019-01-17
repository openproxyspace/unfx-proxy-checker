import path from 'path';

export const SETTINGS_FILE_NAME = 'settings.unfx.checker.json';
export const SETTINGS_FILE_PATH = process.env.PORTABLE_EXECUTABLE_DIR ? path.resolve(process.env.PORTABLE_EXECUTABLE_DIR, SETTINGS_FILE_NAME) : SETTINGS_FILE_NAME;

export const DEFAULT_CORE_SETTINGS = {
    threads: 350,
    timeout: 15000,
    retry: false,
    captureFullData: false,
    captureExtraData: false,
    protocols: {
        http: true,
        https: true,
        socks4: true,
        socks5: true
    }
};

export const DEFAULT_JUDGES_SETTINGS = {
    swap: true,
    items: [
        {
            url: 'http://proxyjudge.info/azenv.php',
            ssl: false,
            validate: {
                enabled: true,
                value: 'proxyjudge.info'
            }
        },
        {
            url: 'https://yandex.ru/company',
            ssl: true,
            validate: {
                enabled: true,
                value: 'yandex'
            }
        },
        {
            url: 'https://www.wikipedia.org/',
            ssl: true,
            validate: {
                enabled: true,
                value: 'wikipedia'
            }
        },
        {
            url: 'http://www.sbjudge3.com/azenv.php',
            ssl: false,
            validate: {
                enabled: true,
                value: 'sbjudge3.com'
            }
        },
        {
            url: 'http://proxyjudge.us/azenv.php',
            ssl: false,
            validate: {
                enabled: true,
                value: 'proxyjudge.us'
            }
        },
        {
            url: 'http://azenv.net/',
            ssl: false,
            validate: {
                enabled: true,
                value: 'azenv.net'
            }
        },
        {
            url: 'http://www.cooleasy.com/azenv.php',
            ssl: false,
            validate: {
                enabled: true,
                value: 'cooleasy.com'
            }
        },
        {
            url: 'http://pascal.hoez.free.fr/azenv.php',
            ssl: false,
            validate: {
                enabled: true,
                value: 'pascal.hoez.free.fr'
            }
        },
        {
            url: 'http://www.proxy-listen.de/azenv.php',
            ssl: false,
            validate: {
                enabled: true,
                value: 'proxy-listen.de'
            }
        }
    ]
};

export const DEFAULT_IP_SETTINGS = {
    current: '',
    lookupUrl: 'https://api.ipify.org'
};

export const DEFAULT_BLACKLIST_SETTINGS = {
    filter: false,
    items: [
        {
            title: 'Spamhaus DROP',
            active: true,
            path: 'https://www.spamhaus.org/drop/drop.txt'
        },
        {
            title: 'Spamhaus EDROP',
            active: true,
            path: 'https://www.spamhaus.org/drop/edrop.txt'
        },
        {
            title: 'MYIP.MS General',
            active: true,
            path: 'https://myip.ms/files/blacklist/general/latest_blacklist.txt'
        }
    ]
};

export const DEFAULT_EXPORTING_SETTINGS = {
    type: 1
};

export const MERGED_DEFAULT_SETTINGS = {
    core: DEFAULT_CORE_SETTINGS,
    judges: DEFAULT_JUDGES_SETTINGS,
    ip: DEFAULT_IP_SETTINGS,
    blacklist: DEFAULT_BLACKLIST_SETTINGS,
    exporting: DEFAULT_EXPORTING_SETTINGS
};
