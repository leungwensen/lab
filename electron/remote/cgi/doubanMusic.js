/* jshint strict: false, undef: true, unused: true */

const HOST = 'music.douban.com';
const HOST_URL = 'http://music.douban.com';

//var pastry = require('pastry'),
    //sprintf = pastry.sprintf,
    //querystring = pastry.querystring,
    //extend = pastry.extend;

var utils = require('./utils'),
    noop = utils.noop,
    getUrl = utils.genGetUrl(HOST_URL),
    parseRes = utils.parseRes;

var headers = {
        HOST: HOST,
        Referer: HOST_URL,
        Cookie: utils.uuidCookie('bid=')
    },
    request = require('request').defaults({
        jar : true,
        headers : headers
    });

var cgi = {
    subjectSearch: function(opt, cb) {
        cb = cb || noop;
        request(getUrl('/subject_search'), {
            qs: {
                search_text: opt.search_text,
                start: opt.start
            }
        }, function(/*err, res, body*/) {
            // 从html里抓去专辑信息
        });
    },
    songInfo: function(opt, cb) { // song_id
        cb = cb || noop;
        request(getUrl('/api/song/info'), {
            qs: {
                song_id : opt.song_id
            }
        },function(err, res, body) {
            if (err) {
                return console.error(err);
            }
            body = parseRes(res);
            if (body) {
                cb(null, body);
                // body.lyric 是歌词
            }
        });
    },
    songUrl: function(opt, cb) { // sid, ssid
        // http://music.douban.com/j/songlist/get_song_url?sid=%s&ssid=%s
    },
    songSsid: function(opt, cb) { // sid, subject
        // 直接从http://music.douban.com/subject/%s上拉取专辑数据，从html里分析歌曲的ssid
        // 这样可以解决从｀我的FM｀听某一首歌的问题
    },
    programme: function(opt, cb) { // pid
        // http://music.douban.com/programme/%s
    },
    songlist: function(opt, cb) { // cid
        // http://music.douban.com/j/songlist/home_songlists_by_category?cid=1
    },
};

module.exports = cgi;

