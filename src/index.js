import path from 'path';
import url from 'url';
import { BrowserWindow, app, ipcMain } from 'electron';
import { autoUpdater } from 'electron-updater';
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
        webPreferences: {
            contextIsolation: false,
            nodeIntegration: true,
            webviewTag: true
        }
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
        resizable: true,
        webPreferences: {
            contextIsolation: false,
            nodeIntegration: true,
            webviewTag: true
        }
    });

    window.setMenu(null);
};

const createWindow = () => {
    process.env.NODE_ENV !== 'production' ? devWindow() : prodWindow();

    window.loadURL(
        process.env.NODE_ENV !== 'production'
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
};

autoUpdater.on('update-downloaded', () => {
    window.webContents.send('update-is-downloaded');
});

autoUpdater.on('download-progress', progress => {
    window.webContents.send('update-download-progress', progress.percent);
});

ipcMain.on('quit-and-install', () => {
    autoUpdater.quitAndInstall(true, true);
});

app.on('ready', () => {
    createWindow();
    autoUpdater.checkForUpdates();
});

app.on('activate', () => {
    if (window === null) {
        createWindow();
    }
});
