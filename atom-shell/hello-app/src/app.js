/* jshint strict: true, undef: true, unused: true */
/* global define, require, console */


// third-party dependencies {
    var marked = require('marked'); // !!!!! this `require` is from nodejs !!!!!
    define('lib/marked', function() {
        'use strict';
        /*
         * @author      : 绝云（wensen.lws）
         * @description : description
         */

        marked.setOptions({
            renderer    : new marked.Renderer(),
            gfm         : true,
            tables      : true,
            breaks      : false,
            pedantic    : false,
            smartLists  : true,
            smartypants : false
        });

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
                $editor    = domQuery.one('#editor'),
                $previewer = domQuery.one('#previewer'),
            // }
            // helpers {
                each = pastry.each;
            // }

        function processInput (input) {
            return input
                .replace(/\-\ \[\ \] /g, '* <input type="checkbox"/> ')
                .replace(/\-\ \[x\] /g , '* <input type="checkbox" checked/> ');
        }
        function render () {
            // fixing html {
                var input         = $editor.value,
                    renderedInput = processInput(input),
                    html          = marked(renderedInput),
                    renderedHTML  = html
                        .replace(/<table>/g, '<table class="table">');
            // }

            $previewer.innerHTML = renderedHTML;
        }

        each([
            'click',
            'blur',
            'keyup'
        ], function (type) {
            domEvent.on($editor, type, render);
        });

        // test contextmenu {
            domEvent.on($previewer, 'contextmenu', function (e) {
                console.log(e);
            });
        // }
    });
// }

