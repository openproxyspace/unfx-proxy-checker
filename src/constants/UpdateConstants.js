const LATEST_RELEASES_API_PATH = '';

export const FETCH_CONFIG = {
    url: LATEST_RELEASES_API_PATH,
    json: true,
    timeout: 5000,
    headers: {
        'User-Agent': 'hproxy Version Lookup'
    }
};
