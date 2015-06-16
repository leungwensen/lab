/* jshint strict: true, undef: true, unused: true */
/* global define */

define([
    'pastry/dom/query',
    'pastry/dom/style',
    './event'
], function(
    domQuery,
    domStyle,
    event
) {
    'use strict';
    /*
     * @author      : 绝云（wensen.lws）
     * @description : description
     */
    var elementDetail = domQuery.one('#detail');
    event.on('toggle-detail', function() {
        domStyle.toggle(elementDetail);
    });
});

