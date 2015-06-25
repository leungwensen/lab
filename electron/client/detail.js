/* jshint strict: true, undef: true, unused: true */
/* global define */

define([
    'pastry/dom/query',
    'pastry/dom/style',
    './component/Tab',
    './event/detail'
], function(
    domQuery,
    domStyle,
    Tab,
    detailEvent
) {
    'use strict';
    /*
     * @author      : 绝云（wensen.lws）
     * @description : description
     */
    var detail,
        detailDomNode = domQuery.one('#detail');
    detail = {
        domNode: detailDomNode,
        domNodes: {
            btnToggle: domQuery.one('#btn-detail'),
        },
        tab: new Tab({
            selector: '.tab-navigator',
            domNode: domQuery.one('.tab-navigators', detailDomNode)
        }),
        toggle: function () {
            domStyle.toggle(detail.domNode);
        }
    };
    detailEvent(detail);
    return detail;
});

