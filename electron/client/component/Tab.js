/* jshint strict: true, undef: true, unused: true */
/* global define */

define([
    'pastry/pastry',
    'pastry/dom/class',
    'pastry/dom/data',
    'pastry/dom/event',
    'pastry/dom/query',
    'pastry/fmt/sprintf',
    'pastry/oop/declare',
    'pastry/ui/Component'
], function(
    pastry,
    domClass,
    domData,
    domEvent,
    domQuery,
    sprintf,
    declare,
    Component
) {
    'use strict';
    /*
     * @author      : 绝云（wensen.lws）
     * @description : description
     */
    var extend = pastry.extend,
        each = pastry.each,
        some = pastry.some,
        classNames = {
            navigator: 'tab-navigator',
            selected: 'selected'
        },
        DEFAULT_OPTION = {
            selector: null,
            trigger: 'click',
            domNode: null
        },
        Tab = declare('Tab', [Component], {
            constructor: function(option) {
                var me = this;
                extend(me, DEFAULT_OPTION, option);
                me.tabs = domQuery.all(me.selector, me.domNode);
                me.tabContents = [];
                each(me.tabs, function(tab) {
                    me.tabContents.push(domQuery.all(domData.get(tab, 'target')));
                });
                me.selectedTab = domQuery.one(
                    sprintf('.%s.%s', classNames.navigator, classNames.selected),
                    me.domNode
                ) || me.tabs[0];
                me.selected = me._getTabIndex(me.selectedTab);
                me.show(me.selected);
                return me._bindEvents();
            },
            _bindEvents: function() {
                var me = this;
                domEvent.on(me.domNode, me.trigger, me.selector, function(e) {
                    me.show(me._getTabIndex(e.delegateTarget));
                });
                return me;
            },
            _getTabIndex: function(tab) {
                var me = this,
                    result = 0;
                some(me.tabs, function(t, index) {
                    if (tab === t) {
                        result = index;
                        return true;
                    }
                });
                return result;
            },
            _toggleContents: function(index, isShow) {
                var me = this,
                    action = isShow ? 'add' : 'remove';
                each(me.tabContents[index], function(content) {
                    domClass[action](content, classNames.selected);
                });
                return me;
            },
            selected: 0,
            show: function(index) {
                var me = this,
                    tab2show = me.tabs[index],
                    currentTab = me.selectedTab;
                if (tab2show !== currentTab) {
                    domClass.remove(currentTab, classNames.selected);
                    domClass.add(tab2show, classNames.selected);
                    me._toggleContents(me._getTabIndex(currentTab));
                    me._toggleContents(index, true);
                    me.selected = index;
                    me.selectedTab = tab2show;
                }
                return me;
            }
        });
    return Tab;
});

