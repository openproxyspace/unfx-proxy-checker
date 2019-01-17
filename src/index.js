import path from 'path';
import url from 'url';
import { BrowserWindow, app } from 'electron';
import installExtension, { REACT_DEVELOPER_TOOLS } from 'electron-devtools-installer';

let window;

const devWindow = () => {
    installExtension(REACT_DEVELOPER_TOOLS)
        .then(name => console.log('Added:', name))
        .catch(err => console.log('Error:', err));

    window = new BrowserWindow({
        width: 1850,
        height: 960,
        show: false
    });

    window.webContents.openDevTools();
};

const prodWindow = () => {
    window = new BrowserWindow({
        minWidth: 1000,
        minHeight: 680,
        width: 1220,
        height: 745,
        show: false,
        resizable: true
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

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (window === null) {
        createWindow();
    }
});
