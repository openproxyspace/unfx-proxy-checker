import { readFile, stat } from 'fs';
import { remote } from 'electron';
import { uniq } from '../misc/array';
import { findProxies } from '../misc/regexes';
import { INPUT_SET_LOADED_FILE_DATA } from '../constants/ActionTypes';
import { promisify } from 'util';
import { parse } from 'path';

const { dialog } = remote;

const readTextFile = promisify(readFile);
const getFileStat = promisify(stat);

export const setLoadedData = nextState => ({
    type: INPUT_SET_LOADED_FILE_DATA,
    nextState
});

export const loadFromTxt = () => async dispatch => {
    try {
        const {
            filePaths: [path]
        } = await dialog.showOpenDialog({
            filters: [
                {
                    name: 'Text Files',
                    extensions: ['txt']
                }
            ]
        });

        if (path) {
            const fileText = await readTextFile(path, 'utf8');
            const totalProxies = findProxies(fileText);

            if (!totalProxies) throw { status: 'error', message: 'No proxies found' };

            const { size } = await getFileStat(path);
            const uniqueProxies = uniq(totalProxies);
            const total = totalProxies.length;
            const unique = uniqueProxies.length;

            dispatch(
                setLoadedData({
                    loaded: true,
                    list: uniqueProxies,
                    name: parse(path).base,
                    size,
                    total,
                    unique
                })
            );
        }
    } catch ({ status }) {
        if (status == 'error') alert('No proxies found');
    }
};
