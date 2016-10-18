'use strict';

const electron = require('electron');
const lang = require('zero-lang');
const xmind = require('xmind');

const app = electron.app;
const BrowserWindow = electron.BrowserWindow;
const pastry = require('./lib/leungwensen/pastry/build/nodejs.js');


// report crashes to the Electron project
//require('crash-reporter').start();

// prevent window being GC'd
let mainWindow = null;

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('ready', function () {
    mainWindow = new BrowserWindow({
        height: 600,
        width: 1200,
        'min-width': 640,
        'min-height': 480,
        //resizable: true,
        frame: false,
        title: 'title',
        //transparent: true,
    });

    mainWindow.loadUrl(pastry.sprintf('file://%s/index.html', __dirname));

    mainWindow.openDevTools(); // DevTools

    mainWindow.on('closed', function () {
        // deref the window
        // for multiple windows store them in an array
        mainWindow = null;
    });
});
