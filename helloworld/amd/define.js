/* jshint strict: true, undef: true, unused: true */
// /* global xxx, yyy */
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
        modules = {};

    function addDefinition () {
        
    }

    define = GLOBAL.define = function (/* id? dependencies? factory */) {
        var args         = pastry.toArray(arguments),
            id           = pastry.isString(args[0]) ? args.shift() : undef,
            dependencies = args.length > 1 ? args.shift() : [],
            factory      = args[0];
    };
    define.amd = {}; // 最小实现
}(this));
