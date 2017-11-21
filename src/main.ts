import {app, BrowserWindow} from 'electron';

let win: BrowserWindow;

const createWindow = () => {
    win = new BrowserWindow({width: 800, height: 600});

    win.loadURL('http://localhost:8080/index.html');

    win.webContents.openDevTools();
};

app.on('ready', createWindow);
