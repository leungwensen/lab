/* jshint strict: true, undef: true, unused: true */
/* global define */

define([
    'pastry/dom/event',
    '../event'
], function(
    domEvent,
    event
) {
    'use strict';
    /*
     * @author      : 绝云（wensen.lws）
     * @description : description
     */
    return function(detail) {
        //var domNodes = detail.domNodes;

        // events {
            event.on('detail-toggle', function() {
                detail.toggle();
            });
        // }
        // dom events {
            //domEvent.on(domNodes.btnToggle, 'click', function() {
                //event.trigger('detail-toggle');
            //});
        // }
    };
});

