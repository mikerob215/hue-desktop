import {app, BrowserWindow} from 'electron';
import * as url from "url";

let win: BrowserWindow;

const createWindow = () => {
    win = new BrowserWindow({width: 800, height: 600});

    win.loadURL(url.format({

    }))
};

app.on('ready', createWindow);
