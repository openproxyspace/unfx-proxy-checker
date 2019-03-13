import path from 'path';

export const SETTINGS_FILE_NAME = 'settings.unfx.checker.json';
export const SETTINGS_FILE_PATH = process.env.PORTABLE_EXECUTABLE_DIR ? path.resolve(process.env.PORTABLE_EXECUTABLE_DIR, SETTINGS_FILE_NAME) : SETTINGS_FILE_NAME;

export const DEFAULT_CORE_SETTINGS = {
    threads: 350,
    keepAlive: false,
    timeout: 15000,
    retry: false,
    shuffle: false,
    captureFullData: false,
    captureServer: false,
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
            active: true,
            url: 'http://proxyjudge.info/azenv.php',
            validate: 'AZ Environment variables'
        },
        {
            active: true,
            url: 'http://www.sbjudge3.com/azenv.php',
            validate: 'AZ Environment variables'
        },
        {
            active: true,
            url: 'http://proxyjudge.us/azenv.php',
            validate: 'AZ Environment variables'
        },
        {
            active: true,
            url: 'http://azenv.net/',
            validate: 'AZ Environment variables'
        },
        {
            active: true,
            url: 'http://www.cooleasy.com/azenv.php',
            validate: 'AZ Environment variables'
        },
        {
            active: true,
            url: 'http://pascal.hoez.free.fr/azenv.php',
            validate: 'AZ Environment variables'
        },
        {
            active: true,
            url: 'http://www.proxy-listen.de/azenv.php',
            validate: 'AZ Environment variables'
        },
        {
            active: true,
            url: 'https://api.ipify.org/',
            validate: '(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)'
        },
        {
            active: true,
            url: 'https://ident.me/',
            validate: '(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)'
        },
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
