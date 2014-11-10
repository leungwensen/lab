/* jshint strict: true, undef: true, unused: true */
/* global console */

var define;
(function (GLOBAL) {
    /*
     * @author      : wensen.lws
     * @description : AMD define 模块
     */
    'use strict';

    var
        undef,
        pastry  = GLOBAL.pastry,
        event   = pastry.event,
        modules = {},
        Module = function() {
            
        };

    event(Module); // add on(), off(), emit(), trigger() to amd object

    function getDependencies (ids) {
        var deps = [];
        pastry.each(ids, function(id) {
            
        });
    }

    define = GLOBAL.define = function (/* id? dependencies? factory */) {
        var args         = pastry.toArray(arguments),
            id           = pastry.isString(args[0]) ? args.shift() : undef,
            dependencies = args.length > 1 ? args.shift() : [],
            factory      = args[0];
        console.log(id, dependencies, factory);
    };

    define.amd = {}; // AMD 最小实现
    define.cmd = {}; // CMD 最小实现

    Module.define = define;

    // 核心模块 {
        define('pastry', pastry);
        define('Module', Module);
    // }
}(this));
