const LATEST_RELEASES_API_PATH = 'https://api.github.com/repos/ProxyScrape/proxy-checker/releases';

export const FETCH_CONFIG = {
    url: LATEST_RELEASES_API_PATH,
    json: true,
    timeout: 5000,
    headers: {
        'User-Agent': 'Unfx Version Lookup'
    }
};
