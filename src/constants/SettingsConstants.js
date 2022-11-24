import path from 'path';
import { ipcRenderer } from 'electron';
import { isDev, isPortable } from './AppConstants';

const userData = ipcRenderer.sendSync('getUserData');

export const SETTINGS_FILE_NAME = 'settings.unfx.checker.json';
export const SETTINGS_FILE_PATH = isPortable
    ? path.resolve(process.env.PORTABLE_EXECUTABLE_DIR, SETTINGS_FILE_NAME)
    : isDev
    ? path.resolve(SETTINGS_FILE_NAME)
    : path.resolve(userData, SETTINGS_FILE_NAME);

export const DEFAULT_CORE_SETTINGS = {
    threads: 350,
    keepAlive: false,
    timeout: 15000,
    retries: 0,
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
            url: 'http://judge1.api.proxyscrape.com',
            validate: 'AZ Environment variables'
        },
        {
            active: true,
            url: 'http://judge2.api.proxyscrape.com',
            validate: 'AZ Environment variables'
        },
        {
            active: true,
            url: 'http://judge3.api.proxyscrape.com',
            validate: 'AZ Environment variables'
        },
        {
            active: true,
            url: 'http://judge4.api.proxyscrape.com',
            validate: 'AZ Environment variables'
        },
        {
            active: true,
            url: 'http://judge5.api.proxyscrape.com',
            validate: 'AZ Environment variables'
        },
        {
            active: true,
            url: 'https://ssl-judge1.api.proxyscrape.com',
            validate: 'REMOTE_ADDR = (25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)'
        },
        {
            active: true,
            url: 'https://ssl-judge2.api.proxyscrape.com',
            validate: 'REMOTE_ADDR = (25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.(25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)'
        }
    ]
};

export const DEFAULT_IP_SETTINGS = {
    current: '',
    lookupUrl: 'https://api.proxyscrape.com/ip.php'
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

export const DEFAULT_MAIN_SETTINGS = {
    dark: false
};

export const MERGED_DEFAULT_SETTINGS = {
    core: DEFAULT_CORE_SETTINGS,
    judges: DEFAULT_JUDGES_SETTINGS,
    ip: DEFAULT_IP_SETTINGS,
    blacklist: DEFAULT_BLACKLIST_SETTINGS,
    exporting: DEFAULT_EXPORTING_SETTINGS,
    main: DEFAULT_MAIN_SETTINGS
};
