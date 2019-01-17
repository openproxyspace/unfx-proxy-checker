const FETCH_LATEST_VERSION_API_PATH = 'https://api.github.com/repos/assnctr/unfx-proxy-checker/releases/latest';

export const FETCH_CONFIG = {
    url: FETCH_LATEST_VERSION_API_PATH,
    json: true,
    timeout: 5000,
    headers: {
        'User-Agent': 'Unfx Version Lookup'
    }
};
