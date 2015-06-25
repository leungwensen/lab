/* jshint strict: true, undef: true, unused: true */
/* global define */

define([
    'pastry/pastry',
    'pastry/dom/event',
    '../event'
], function(
    pastry,
    domEvent,
    event
) {
    'use strict';
    /*
     * @author      : 绝云（wensen.lws）
     * @description : description
     */
    return function(floating) {
        var domNode = floating.domNode,
            domNodes = floating.domNodes;
        // events {
            event.on('floating-toggle', function(isShow) {
                floating.toggle(isShow);
                if (isShow) {
                    event.trigger('floating-before-show');
                } else {
                    event.trigger('floating-before-hide');
                }
            });
            event.on('floating-show', function() {
                floating.toggle(true);
            });
            event.on('floating-hide', function() {
                floating.toggle();
            });
            event.on('floating-before-show', function() {
                floating.showLoading();
            });
            event.on('floating-after-hide', function() {
                floating.clear();
            });
        // }
        // dom events {
            // FIXME for test
            //domEvent.on('#player', 'click', function() {
                //event.trigger('floating-toggle', !floating.isShown);
            //});
            domEvent.on(domNodes.close, 'click', function() {
                event.trigger('floating-toggle', false);
            });
            domEvent.on(domNode, 'transitionend', function() {
                if (floating.isShown) {
                    event.trigger('floating-after-show');
                } else {
                    event.trigger('floating-after-hide');
                }
            });
        // }
    };
});

