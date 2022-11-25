import path from 'path';
import url from 'url';
import { BrowserWindow, app, ipcMain, dialog } from 'electron';
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
        height: 905,
        show: false,
        frame: false,
        icon: __dirname + '../public/icons/icon.png',
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            nodeIntegrationInWorker: true,
            sandbox: false
        }
    });

    window.webContents.openDevTools();
   
};

const prodWindow = () => {
    window = new BrowserWindow({
        minWidth: 1000,
        minHeight: 680,
        width: 1220,
        height: 905,
        icon: __dirname + '../public/icons/icon.png',
        show: false,
        frame: false,
        resizable: true,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
            nodeIntegrationInWorker: true,
            sandbox: false
        }
    });

    window.removeMenu();
    
};

const createWindow = () => {
    isDev ? devWindow() : prodWindow();

    window.loadURL(
        isDev
            ? 'http://localhost:32321'
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

ipcMain.handle('choose-path', async (event, action = 'save') => {
    try {
        const { filePaths, filePath } = await (action === 'save' ? dialog.showSaveDialog : dialog.showOpenDialog)({
            filters: [
                {
                    name: 'Text Files',
                    extensions: ['txt']
                }
            ],
            properties: ['multiSelections']
        });

        if (filePaths) return filePaths[0];
        if (filePath) return filePath;
    } catch (error) {
        console.error(error);
    }
});

ipcMain.handle('choose-multi', async () => {
    try {
        const { filePaths } = await dialog.showOpenDialog({
            filters: [
                {
                    name: 'Text Files',
                    extensions: ['txt']
                }
            ],
            properties: ['multiSelections']
        });

        if (filePaths.length) return filePaths;
    } catch (error) {
        console.error(error);
    }
});

ipcMain.on('getUserData', event => {
    event.returnValue = app.getPath('userData');
});

app.on('ready', () => {
    createWindow();

    if (!isDev && !isPortable) autoUpdater.checkForUpdates();
});

app.on('activate', () => {
    if (window === null) {
        createWindow();
    }
});

app.on('window-all-closed', async () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

// updater events

autoUpdater.on('update-downloaded', () => {
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
