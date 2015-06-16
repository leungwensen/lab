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
    lyric: function(opt, cb) {
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
                cb(null, body.lyric);
            }
        });
    },
    search: function(opt, cb) {
        cb = cb || noop;
        request(getUrl('/subject_search'), {
            qs: {
                search_text: opt.search_text,
                start: opt.start
            }
        }, function(/*err, res, body*/) {
            // TODO
        });
    }
};

module.exports = cgi;

