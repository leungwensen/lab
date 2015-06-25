/* jshint strict: true, undef: true, unused: true */
/* global define, localStorage */

define([
    'pastry/pastry',
    'pastry/encoding/json'
], function(
    pastry,
    json
) {
    'use strict';
    /*
     * @author: 绝云（wensen.lws）
     * @description: description
     */
    var getAny = pastry.getAny,
        storage = {
            get: function(key, defaultValue) {
                return getAny(function() {
                    return json.parse(localStorage.getItem(key));
                }, function() {
                    return defaultValue;
                });
            },
            set: function(key, value) {
                localStorage.setItem(key, json.stringify(value));
            },
            remove: function(key) {
                localStorage.removeItem(key);
            },
            clear: function() {
                localStorage.clear();
            },
        };
    return storage;
});

