export const API_CURRENT_STATS_URL = 'https://api.openproxy.space/stats';

export const isPortable = process.env.PORTABLE_EXECUTABLE_DIR ? true : false;
export const isDev = process.env.NODE_ENV === 'production' ? false : true;
