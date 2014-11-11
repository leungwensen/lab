/* jshint strict: true, undef: true, unused: true */
// /* global document */

var define, require;

(function (GLOBAL, undef) {
    /*
     * @author      : wensen.lws
     * @description : 模块加载
     */
    'use strict';

    var
        pastry = GLOBAL.pastry,
        event  = pastry.event,

        cachedModules = {},

        Module = function (id, deps, factory) {
        };

    event(Module);

    define = GLOBAL.define = function (/* id, deps, factory */) {
        // 解释参数 {
            var args    = pastry.toArray(arguments),
                id      = pastry.isString(args[0]) ? args.shift() : undef,
                deps    = args.length > 1 ? args.shift() : [],
                factory = args[0];
        // }
    };

    Module.prototype = {
    };

    // 核心模块定义 {
        define('module', function () {
            return Module;
        });
        define('pastry', function () {
            return pastry;
        });
        define('event', function () {
            return event;
        });
    // }
}(this));
