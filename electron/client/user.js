/* jshint strict: true, undef: true, unused: true */
/* global define */

define([
    'pastry/dom/event',
    'pastry/dom/query',
    './event'
], function(
    domEvent,
    domQuery,
    event
) {
    'use strict';
    /*
     * @author      : 绝云（wensen.lws）
     * @description : description
     */
    var elementUserInfo = domQuery.one('#user-info');
    domEvent.on(elementUserInfo, 'click', function() {
        event.trigger('toggle-detail');
    });
});

