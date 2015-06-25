/* jshint strict: true, undef: true, unused: true */
/* global define */

define([
    'pastry/pastry',
    'pastry/dom/class',
    'pastry/dom/construct',
    'pastry/dom/query',
    './component/LoadingSpinner',
    './event/floating'
], function(
    pastry,
    domClass,
    domConstruct,
    domQuery,
    LoadingSpinner,
    floatingEvent
) {
    'use strict';
    /*
     * @author      : 绝云（wensen.lws）
     * @description : description
     */
    var floating,
        floatingDomNode = domQuery.one('#floating'),
        domNodes = {
            body: domQuery.one('.floating-body', floatingDomNode),
            close: domQuery.one('.fa-close', floatingDomNode),
            header: domQuery.one('.floating-header', floatingDomNode),
            title: domQuery.one('.floating-title', floatingDomNode)
        };
    floating = {
        domNode: floatingDomNode,
        domNodes: domNodes,
        toggle: function(isShow) {
            domClass[isShow ? 'add' : 'remove'](floatingDomNode, 'show');
            floating.isShown = !!isShow;
        },
        showLoading: function() {
            new LoadingSpinner().placeAt(domNodes.body, 'only');
        },
        isShown: false,
        clear: function() {
            domNodes.title.innerHTML = '';
            domConstruct.empty(domNodes.body);
        }
    };
    floatingEvent(floating);
    return floating;
});

