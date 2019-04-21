import rp from 'request-promise';
import { remote } from 'electron';
import { FETCH_CONFIG } from '../constants/UpdateConstants';
import { isPortable } from '../constants/AppConstants';

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
            const releaseNotes = releases
                .filter(item => item.tag_name.slice(1) > currentVersion)
                .map(item => ({
                    version: item.tag_name.slice(1),
                    body: item.body
                }));

            const [portableAsset] = latest.assets.filter(asset => asset.name.match(/portable/i));

            return {
                latestVersion: version,
                isPortable,
                releaseNotes,
                portableAsset
            };
        } else {
            return false;
        }
    } catch (error) {
        return false;
    }
};
