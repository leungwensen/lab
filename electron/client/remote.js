/* jshint strict: true, undef: true, unused: true */
/* global window */

(function() {
    'use strict';
    window.GLOBAL_VARIABLES = {
        ipc: require('ipc'),
        cgi: {
            doubanApp: require('./remote/cgi/doubanApp.js'),
            doubanFM: require('./remote/cgi/doubanFM.js'),
            doubanMusic: require('./remote/cgi/doubanMusic.js'),
        }
    };
}());

