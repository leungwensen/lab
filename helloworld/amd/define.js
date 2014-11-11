/* jshint strict: true, undef: true, unused: true */
// /* global document */

var define,
    require;

(function (GLOBAL, undef) {
    /*
     * @author      : wensen.lws
     * @description : AMD define 模块
     */
    'use strict';

    var
        pastry = GLOBAL.pastry,
        event  = pastry.event,
        // doc    = document,

        modules      = {},
        moduleValues = {},

        CONST = {
            status: {
                UNDEFINED : 0,
                FETCHING  : 1,
                SAVED     : 2,
                LOADING   : 3,
                LOADED    : 4,
                EXECUTING : 5,
                EXECUTED  : 6,
                ERROR     : 7
            }
        },

        Module = function (id, deps, factory) {
            var mod            = this;
            pastry.extend(mod, {
                id      : id,
                deps    : deps,
                factory : factory
            });
            return mod.init();
        };

    event(Module); // add on(), off(), emit(), trigger() to amd object

    // helper functions {
        function normalize (id) {
            return id;
        }
        function id2Uri (id) {
            return id;
        }
        function getCurrentScript () {
            return '';
        }
        // function getScripts () {
        //     return doc.getElementsByTagName('script');
        // }
    // }

    Module.prototype = {
        init: function () {
            var mod            = this,
                id             = mod.id,
                deps           = mod.deps,
                factory        = mod.factory,
                normalizedDeps = [],
                depModuleById  = {};

            pastry.each(deps, function (dep) {
                var normalizedId = normalize(dep);
                normalizedDeps.push(normalizedId);
                depModuleById[normalizedId] = modules[normalizedId];
            });

            if (!id) {
                id = getCurrentScript().src;
            }

            pastry.extend(mod, {
                depModuleById : depModuleById,
                depValues     : [],
                deps          : normalizedDeps,
                factory       : factory,
                id            : id,
                status        : CONST.status.UNDEFINED,
                uri           : id2Uri(id)
            });
            modules[id] = mod;
            mod.exportValue = mod.getExportValue();
            return mod;
        },
        getExportValue: function () {
            var mod         = this,
                factory     = mod.factory,
                exportValue = moduleValues[mod.id],
                depValues   = [];

            if (exportValue) {
                return exportValue;
            }
            pastry.each(mod.deps, function (depId/*, id*/) {
                depValues.push(mod.depModuleById[depId].exportValue);
            });
            mod.depValues = depValues;

            exportValue = pastry.isFunction(factory) ? factory.apply(undef, depValues) : factory;
            return exportValue;
        }
    };

    define = GLOBAL.define = function (/* id? deps? factory */) {
        var args    = pastry.toArray(arguments),
            id      = pastry.isString(args[0]) ? args.shift() : undef,
            deps    = args.length > 1 ? args.shift() : [],
            factory = args[0];

        new Module(id, deps, factory);
    };

    require = define;

    define.amd = {}; // AMD 最小实现
    define.cmd = {}; // CMD 最小实现

    Module.define = define;

    // 核心模块 {
        define('pastry', function () {
            return pastry;
        });
        define('event', function () {
            return event;
        });
        define('Module', function () {
            return Module;
        });
    // }
}(this));

