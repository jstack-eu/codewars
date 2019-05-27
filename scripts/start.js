const electron = require('electron');
const app = electron.app;
const BrowserWindow = electron.BrowserWindow;

const path = require('path');
const url = require('url');

let window;

function createWindow() {
    require('../src/electron/main')(app, window);

    window = new BrowserWindow({ width: 800, height: 600 });

    window.loadURL(
        process.env.ELECTRON_START_URL ||
        url.format({
            pathname: path.join(__dirname, '/../build/index.html'),
            protocol: 'file:',
            slashes: true
        })
    );

    window.on('closed', () => {
        window = null;
    });
}

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
