import path from 'path';
import url from 'url';
import { BrowserWindow, app, ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';
import { isDev, isPortable } from './constants/AppConstants';
import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';

let window;

const devWindow = () => {
    installExtension(REACT_DEVELOPER_TOOLS)
        .then(name => console.log('Added:', name))
        .catch(err => console.log('Error:', err));

    window = new BrowserWindow({
        width: 1220,
        height: 846,
        show: false,
        frame: false
    });

    window.webContents.openDevTools();
};

const prodWindow = () => {
    window = new BrowserWindow({
        minWidth: 1000,
        minHeight: 680,
        width: 1220,
        height: 836,
        show: false,
        frame: false,
        resizable: true
    });

    window.setMenu(null);
};

const createWindow = () => {
    isDev ? devWindow() : prodWindow();

    window.loadURL(
        isDev
            ? 'http://localhost:8080'
            : url.format({
                  pathname: path.join(__dirname, 'index.html'),
                  protocol: 'file:',
                  slashes: true
              })
    );

    window.on('ready-to-show', () => {
        window.show();
    });

    window.on('closed', () => {
        window = null;
    });

    window.on('maximize', () => {
        window.webContents.send('on-window-maximize');
    });

    window.on('unmaximize', () => {
        window.webContents.send('on-window-unmaximize');
    });
};

app.on('ready', () => {
    createWindow();

    if (!isDev && !isPortable) autoUpdater.checkForUpdates();
});

app.on('activate', () => {
    if (window === null) {
        createWindow();
    }
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// updater events

autoUpdater.on('update-downloaded', () => {
    window.webContents.send('update-is-downloaded');
});

autoUpdater.on('download-progress', progress => {
    window.webContents.send('update-download-progress', progress.percent);
});

ipcMain.on('quit-and-install', () => {
    autoUpdater.quitAndInstall(true, true);
});

// window control events

ipcMain.on('window-minimize', () => {
    window.minimize();
});

ipcMain.on('window-maximize', () => {
    window.maximize();
});

ipcMain.on('window-unmaximize', () => {
    window.unmaximize();
});

ipcMain.on('window-close', () => {
    window.close();
});
