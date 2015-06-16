/* jshint strict: true, undef: true, unused: true */
/* global define */

define([
    'pastry/pastry',
    'pastry/dom/class',
    'pastry/dom/query',
    './cgi',
    './component/ProgressBar',
    './event',
    './event/player'
], function(
    pastry,
    domClass,
    domQuery,
    cgi,
    ProgressBar,
    globalEvent,
    playerEvent
) {
    'use strict';
    /*
     * @author      : 绝云（wensen.lws）
     * @description : description
     */
    var toInt = pastry.toInt,
        isFetching = false,
        domNodes = {
            btnBackward: domQuery.one('#btn-previous'),
            btnForward: domQuery.one('#btn-next'),
            btnPlay: domQuery.one('#btn-play'),
            btnVolume: domQuery.one('#btn-volume'),
            labelTimeLeft: domQuery.one('#time-left'),
            labelAlbumTitle: domQuery.one('#album-title'),
            labelArtistName: domQuery.one('#artist-name'),
            labelMusicTitle: domQuery.one('#music-title'),
            progressMusic: domQuery.one('#music-progress'),
            progressVolume: domQuery.one('#volume-progress'),
            imgAlbumCover: domQuery.one('#album-cover'),
        },
        songNode = domQuery.one('#song'),
        musicProgressBar = new ProgressBar({
            onChange: function(value) {
                globalEvent.trigger('player-set-current-time', value);
            }
        }).placeAt(domNodes.progressMusic),
        volumeProgressBar = new ProgressBar({
            value: songNode.volume * 100,
            onChange: function(value) {
                globalEvent.trigger('player-set-volume', value);
            }
        }).placeAt(domNodes.progressVolume),
        player;

    function fillZero(num) {
        if (num < 10) {
            return '0' + num;
        }
        return num;
    }
    function formatTime(totalSeconds) { // 格式化时间串
        totalSeconds = toInt(totalSeconds);
        var hours = Math.floor(totalSeconds/3600),
            minutes = Math.floor((totalSeconds - hours * 3600)/60),
            seconds = totalSeconds - (hours * 3600) - (minutes * 60),
            result = '';

        if (hours) {
            result += fillZero(hours) + ':';
        }
        return result += fillZero(minutes) + ':' + fillZero(seconds);
    }
    function replaceClassname(domNode, originClassname, newClassname) {
        domClass.add(domNode, newClassname);
        domClass.remove(domNode, originClassname);
    }
    function setPlayBtn(isPaused) {
        if (isPaused) {
            replaceClassname(domNodes.btnPlay, 'fa-pause', 'fa-play');
        } else {
            replaceClassname(domNodes.btnPlay, 'fa-play', 'fa-pause');
        }
    }

    player = {
        // domNodes {
            songNode: songNode,
            domNodes: domNodes,
        // }
        // song {
            songs: [],
        // }
        // ProgressBar instances {
            musicProgressBar: musicProgressBar,
            volumeProgressBar: volumeProgressBar,
        // }
        // volume {
            setVolume: function(value) {
                // TODO save and resume this with localStorage
                songNode.volume = value/100;
            },
        // }
        // currentTime {
            getCurrentTime: function() {
                return songNode.currentTime;
            },
            getCurrentProgress: function() {
                return songNode.currentTime/songNode.duration * 100;
            },
            getTimeLeft: function() {
                return songNode.duration - songNode.currentTime;
            },
            getDuration: function() {
                return songNode.duration;
            },
            setCurrentTime: function(time/* seconds */) {
                songNode.currentTime = time/100 * songNode.duration;
            },
            updateMusicProgress: function() {
                domNodes.labelTimeLeft.innerHTML = formatTime(player.getTimeLeft());
                musicProgressBar.setValue(player.getCurrentProgress(), true);
            },
        // }
        // controls {
            play: function() {
                songNode.play();
                setPlayBtn(false);
            },
            pause: function() {
                songNode.pause();
                setPlayBtn(true);
            },
            playOrPause: function() {
                player[songNode.paused ? 'play' : 'pause']();
            },
            next: function() {
                if (isFetching) {
                    return;
                }
                isFetching = true;
                if (player.songs.length) {
                    player.updateSong(player.songs.shift());
                    player.play();
                    isFetching = false;
                } else {
                    player.fetchPlaylist({}, function(err, songs) { // 和认证api结合
                        player.songs = songs;
                        player.next();
                        isFetching = false;
                    });
                }
            },
            previous: function() {
            },
        // }
        // about playlist {
            updateSong: function(song) {
console.log(song);
                songNode.src = song.url;
                domNodes.labelAlbumTitle.innerHTML = song.albumtitle;
                domNodes.labelArtistName.innerHTML = song.artist;
                domNodes.labelMusicTitle.innerHTML = song.title;
                domNodes.imgAlbumCover.src = song.picture;
            },
            fetchPlaylist: function(opt, cb) {
                cgi.doubanFM.playlist(opt, cb);
            }
        // }
    };

    playerEvent(player);
    globalEvent.trigger('player-next');
    return player;
});

