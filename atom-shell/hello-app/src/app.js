/* jshint strict: true, undef: true, unused: true */
/* global define, require */


// third-party dependencies {
    var marked = require('marked'); // !!!!! this `require` is from nodejs !!!!!
    define('lib/marked', function() {
        'use strict';
        /*
         * @author      : 绝云（wensen.lws）
         * @description : description
         */
        return marked;
    });
// }

// main app {
    define([
        'pastry/pastry',
        'pastry/dom/event',
        'pastry/dom/query',
        'lib/marked'
    ], function(
        pastry,
        domEvent,
        domQuery,
        marked
    ) {
        'use strict';
        /*
         * @author      : 绝云（wensen.lws）
         * @description : description
         * @TODO        :
         *      * title & saved / un-saved status
         *      * word counting
         */

        var
            // dom objects {
                // doc = document,
                // body = doc.body,
                $editor = domQuery.one('#editor'),
                $previewer = domQuery.one('#previewer'),
            // }
            // helpers {
                each = pastry.each;
            // }

        function render () {
            var html = marked($editor.value),
                renderedHTML = html
                    .replace('<table>', '<table class="table">');

            $previewer.innerHTML = renderedHTML;
        }

        each([
            'click',
            'blur',
            'keyup'
        ], function (type) {
            domEvent.on($editor, type, render);
        });
    });
// }

