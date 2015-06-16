'use strict';
const app = require('app');
const BrowserWindow = require('browser-window');
const pastry = require('./lib/leungwensen/pastry/build/nodejs.js');

// report crashes to the Electron project
require('crash-reporter').start();

// prevent window being GC'd
let mainWindow = null;

app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('ready', function () {
    mainWindow = new BrowserWindow({
        //frame: false,
        height: 900,
        resizable: true,
        //transparent: true,
        width: 1200,
    });

    mainWindow.loadUrl(pastry.sprintf('file://%s/index.html', __dirname));

    mainWindow.openDevTools(); // DevTools

    mainWindow.on('closed', function () {
        // deref the window
        // for multiple windows store them in an array
        mainWindow = null;
    });
});
