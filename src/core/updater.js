import rp from 'request-promise';
import { FETCH_CONFIG } from '../constants/UpdateConstants';
import { remote } from 'electron';

const {
    app: { getVersion }
} = remote;

export const currentVersion = getVersion();

export const getLatestVersionInfo = async () => {
    try {
        const releases = await rp.get(FETCH_CONFIG);
        const [latest] = releases;
        const version = latest.tag_name.slice(1);

        if (version > currentVersion) {
            const [portableAsset] = latest.assets.filter(asset => asset.name.match(/portable/i));

            return {
                available: true,
                releases,
                portableAsset
            };
        } else {
            return {
                releases
            };
        }
    } catch {
        return false;
    }
};
