/* jshint undef: true, unused: true */
/* global require, process, __dirname */

var app = require('app'), // Module to control application life.
    BrowserWindow = require('browser-window'), // Module to create native browser window.
    // Keep a global reference of the window object, if you don't, the window will
    // be closed automatically when the javascript object is GCed.
    // {
        mainWindow = null;
    // }

require('crash-reporter').start(); // Report crashes to our server.

app.on('window-all-closed', function() {
    // Quit when all windows are closed.
    if (process.platform != 'darwin') {
        app.quit();
    }
});

app.on('ready', function() {
    // This method will be called when atom-shell has done everything
    // initialization and ready for creating browser windows.

    // Create the browser window. {
        mainWindow = new BrowserWindow({
            width      : 1280,
            height     : 900
        });
    // }

    // and load the index.html of the app. {
        mainWindow.loadUrl('file://' + __dirname + '/index.html');
    // }

    // Emitted when the window is closed. {
        mainWindow.on('closed', function() {
            // Dereference the window object, usually you would store windows
            // in an array if your app supports multi windows, this is the time
            // when you should delete the corresponding element.
            mainWindow = null;
        });
    // }
});

