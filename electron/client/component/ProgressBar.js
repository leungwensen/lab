/* jshint strict: true, undef: true, unused: true */
/* global define */

define([
    'pastry/pastry',
    'pastry/dom/construct',
    'pastry/dom/event',
    'pastry/dom/query',
    'pastry/dom/style',
    'pastry/oop/declare',
    'pastry/ui/Component',
    '../template/progressBar'
], function(
    pastry,
    domConstruct,
    domEvent,
    domQuery,
    domStyle,
    declare,
    Component,
    tmplWrapper
) {
    'use strict';
    /*
     * @author      : 绝云（wensen.lws）
     * @description : description
     */
    var extend = pastry.extend,
        uuid = pastry.uuid,
        destroy = pastry.destroy,
        NS = 'p_u_progress_bar',
        DEFAULT_OPTION = {
            value: 0,
            step: 1,
            min: 0,
            max: 100
        },
        ProgressBar = declare('ProgressBar', [Component], {
            constructor: function(option) {
                var me = this;
                extend(me, DEFAULT_OPTION, option);
                me.id = me.id || uuid(NS);
                me.domNode = tmplWrapper(me);
                return me;
            },
            _bindEvents: function() {
                var me = this,
                    domNode = me.domNode;
                // dom events {
                    domEvent.on(domNode, 'click', function(e) {
                        var rect = domNode.getBoundingClientRect();
                        me.setValue((me.max - me.min) * (e.pageX - rect.left)/rect.width);
                    });
                    // TODO drag slider {
                    // }
                // }
                return me;
            },
            placeAt: function() {
                var me = this,
                    domNode;
                Component.prototype.placeAt.apply(me, arguments);
                domNode = me.domNode = domQuery.one('#' + me.id);
                // domNodes {
                    me.domNodes = {
                        bar: domQuery.one('.bar', domNode),
                        slider: domQuery.one('.slider', domNode),
                    };
                // }
                me._bindEvents();
                return me;
            },
            setValue: function(value, dryrun) {
                var me = this,
                    domNodes = me.domNodes;
                if (value <= me.max && value >= me.min) {
                    me.value = value;
                    domStyle.set(domNodes.bar, 'width', value + '%');
                    domStyle.set(domNodes.slider, 'left', value + '%');
                    if (!dryrun) {
                        me.onChange(value);
                    }
                }
                return me;
            },
            destroy: function() {
                var me = this;
                domConstruct.destroy(me);
                destroy(me);
            },
            onChange: function(/*value*/) {}
        });
    return ProgressBar;
});

