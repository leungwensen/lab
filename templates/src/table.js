(function(root, factory) {
    if (typeof define === 'function' && define.amd) {
        define([], factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root['table'] = factory();
    }
}(this, function() {
    'use strict';
    return function(data, helper) {
        data = data || {};
        helper = helper || {};
        var __t;
        var __p = '';
        var __j = Array.prototype.join;
        var print = function() {
            __p += __j.call(arguments, '');
        };
        return (function(i, cols, products) {
            __p += '<table>\n    <thead>\n        <tr>\n        ';
            for (var i = 0; i < cols; i++) {
                __p += '\n            <th>' +
                    ((__t = ('col' + i)) == null ? '' : __t) +
                    '</th>\n        ';
            }
            __p += '\n        </tr>\n    </thead>\n    <tbody>\n    ';
            products.forEach(function(product) {
                __p += '\n        <tr>\n        ';
                for (var i = 0; i < cols; i++) {
                    __p += '\n            <td>' +
                        ((__t = (product[i])) == null ? '' : __t) +
                        '</td>\n        ';
                }
                __p += '\n        </tr>\n    ';
            });
            __p += '\n    </tbody>\n</table>\n';;
            return __p;
        })(data.i, data.cols, data.products);
    };
}));
