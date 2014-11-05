/* jshint strict: true, undef: true, unused: true */
/* global require, define, $, pastry, YUI, window */

define('jquery', function() {
    'use strict';
    return $;
});
define('pastry', pastry);
define('YUI', YUI);

require([
    'jquery'
], function(
    $
) {
    'use strict';

    YUI({ filter:'raw' }).use('aui-diagram-builder', function(Y) {

        var availableFields = [
            {
                type: 'task',
                label: 'Task',
                iconClass: 'diagram-node-task-icon'
            },
            {
                type: 'state',
                label: 'State',
                iconClass: 'diagram-node-state-icon'
            },
            {
                type: 'join',
                label: 'Join',
                iconClass: 'diagram-node-join-icon'
            },
            {
                type: 'fork',
                label: 'Fork',
                iconClass: 'diagram-node-fork-icon'
            },

            {
                type: 'start',
                label: 'Start',
                iconClass: 'diagram-node-start-icon'
            },
            {
                type: 'end',
                label: 'End',
                iconClass: 'diagram-node-end-icon'
            },
            {
                type: 'condition',
                label: 'Condition',
                iconClass: 'diagram-node-condition-icon'
            }
        ];

        var diagramBuilder = new Y.DiagramBuilder({
            availableFields: availableFields,
            boundingBox: '#diagramBuilder',
            height: $(window).height(),
            width: $(window).width(),
            fields: [
                // {
                //     // transitions: [
                //     //     'Task1',
                //     //     { target: 'Task0' }
                //     // ],
                //     name: 'Start0',
                //     type: 'start',
                //     xy: [10, 10]
                // },
                // {
                //     name: 'Condition0',
                //     type: 'condition',
                //     xy: [100, 100]
                // },
                // {
                //     name: 'State0',
                //     type: 'state',
                //     xy: [250, 100]
                // },
                // {
                //     name: 'Join0',
                //     type: 'join',
                //     xy: [100, 300]
                // },
                // {
                //     name: 'Task0',
                //     type: 'task',
                //     xy: [400, 100]
                // },
                // {
                //     name: 'Fork0',
                //     type: 'fork',
                //     xy: [400, 300]
                // },
                // {
                //     name: 'EndNode0',
                //     type: 'end',
                //     xy: [600, 10]
                // }
            ]
        }).render();

        diagramBuilder.connectAll([
            // {
            //     connector: { name: 'Link0' },
            //     source: 'Start0',
            //     target: 'Condition0'
            // },
            // {
            //     connector: { name: 'Link1' },
            //     source: 'Condition0',
            //     target: 'State0'
            // },
            // {
            //     connector: { name: 'Link2' },
            //     source: 'State0',
            //     target: 'Join0'
            // },
            // {
            //     connector: { name: 'Link3' },
            //     source: 'Join0',
            //     target: 'Task0'
            // },
            // {
            //     connector: { name: 'Link4' },
            //     source: 'Task0',
            //     target: 'Fork0'
            // },
            // {
            //     connector: { name: 'Link5' },
            //     source: 'Fork0',
            //     target: 'EndNode0'
            // },
            // {
            //     connector: { name: 'Link6' },
            //     source: 'State0',
            //     target: 'EndNode0'
            // }
        ]);

        // var task = diagramBuilder.addField({
        //     name: 'Task2',
        //     type: 'condition'
        // });
        // task.addTransition('Task1');
        // task.connect('Task1');

    });
});

