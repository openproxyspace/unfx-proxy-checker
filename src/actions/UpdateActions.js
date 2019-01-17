import request from 'request';
import progress from 'request-progress';
import { remote, shell } from 'electron';
import { getLatestVersionInfo } from '../core/updater';
import { createWriteStream } from 'fs';
import { wait } from '../misc/wait';
import { CHANGE_UPDATE_STATE, UPDATE_UP_DOWNLOAD_PROGRESS, UPDATE_CLOSE } from '../constants/ActionTypes';

const { dialog, getCurrentWindow } = remote;

export const checkAtAvailable = () => async dispatch => {
    const details = await getLatestVersionInfo();

    await wait(500);

    if (details) {
        dispatch(
            changeUpdateState({
                isAvailable: true,
                isChecking: false,
                info: details
            })
        );
    } else {
        dispatch(
            changeUpdateState({
                active: false,
                isChecking: false
            })
        );
    }
};

const changeUpdateState = nextState => ({
    type: CHANGE_UPDATE_STATE,
    nextState
});

export const close = () => ({
    type: UPDATE_CLOSE
});

const upDownloadProgress = percent => ({
    type: UPDATE_UP_DOWNLOAD_PROGRESS,
    percent
});

export const download = e => async dispatch => {
    e.preventDefault();

    let savePath = dialog.showSaveDialog({
        defaultPath: e.target.title,
        filters: [
            {
                name: '.rar, .exe, .zip, .7z',
                extensions: ['rar', 'exe', 'zip', '7z']
            }
        ]
    });

    if (!savePath) return;

    dispatch(changeUpdateState({ onDownloading: true }));

    progress(request(e.target.href), {
        throttle: 100
    })
        .on('progress', state => {
            dispatch(upDownloadProgress(state.percent * 100));
        })
        .on('end', () => {
            shell.showItemInFolder(savePath);
            getCurrentWindow().close();
        })
        .pipe(createWriteStream(savePath));
};
