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
    return function(player) {
        var domNodes = player.domNodes,
            songNode = player.songNode;

        // events {
            event.on('player-play', function() {
                player.play();
            });
            event.on('player-pause', function() {
                player.pause();
            });
            event.on('player-play-or-pause', function() {
                player.playOrPause();
            });
            event.on('player-set-current-time', function(value) {
                player.setCurrentTime(value);
            });
            event.on('player-update-music-progress', function() {
                player.updateMusicProgress();
            });
            event.on('player-set-volume', function(value) {
                player.setVolume(value);
            });
            event.on('player-next', function() {
                player.next();
            });
        // }
        // dom events {
            domEvent.on(domNodes.btnPlay, 'click', function() {
                event.trigger('player-play-or-pause');
            });
            domEvent.on(domNodes.btnForward, 'click', function() {
                event.trigger('player-next');
            });
            domEvent.on(songNode, 'timeupdate', function() {
                event.trigger('player-update-music-progress');
            });
            domEvent.on(songNode, 'ended', function() {
                event.trigger('player-pause');
                event.trigger('player-next');
            });
            domEvent.on(songNode, 'durationchange', function() {
                event.trigger('player-update-music-progress');
            });
        // }
    };
});

