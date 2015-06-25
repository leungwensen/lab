/* jshint strict: false, undef: true, unused: true */

const HOST = 'douban.fm';
const HOST_URL = 'http://douban.fm';
const PERSONAL_CHANNEL_ID = 0;
const LIKED_CHANNEL_ID = -3;
const FIXED_CHANNELS = require('./fixedChannels.js');
const GENRE_CHANNELS = require('./genreChannels.js');

var pastry = require('pastry'),
    each = pastry.each,
    sprintf = pastry.sprintf,
    //querystring = pastry.querystring,
    toInt = pastry.toInt,
    extend = pastry.extend;

var utils = require('./utils'),
    noop = utils.noop,
    getUrl = utils.genGetUrl(HOST_URL),
    random = utils.random,
    parseRes = utils.parseRes;

var headers = {
        Referer: HOST_URL,
        Host: HOST,
        'User-Agent': utils.USER_AGENT
    },
    request = require('request'),
    jar = request.jar();

request = require('request').defaults({
    jar: jar,
    headers: headers
});

function getParamsWithPagination(opt) {
    return extend({
        start: 1,
        limit: 10,
    }, opt);
}

var cgi = {
    captchaId: function(opt, cb) {
        cb = cb || noop;
        request(getUrl('/j/new_captcha'), {
            r: random()
        }, function(err, res, body) {
            if (err) {
                return cb(err);
            }
            var id = body.replace(/"/g, '');
            cb(null, id);
        });
    },
    captchaUrl: function(opt, cb) {
        cb = cb || noop;
        cb(null, getUrl('/misc/captcha', {
            size: 'm',
            id: opt.id
        }));
    },
    setCookie: function(cookieStr, cb) {
        cb = cb || noop;
        jar.setCookie(cookieStr, HOST_URL);
        cb();
    },
    login: function(opt, cb) {
        cb = cb || noop;
        request(getUrl('/j/login'), {
            method: 'POST',
            form: true,
            qs: extend({
                remember: 'on',
                source: 'radio',
                //captcha_solution: opt.captcha_solution,
                //alias: opt.alias,
                //form_password: opt.form_password,
                //captcha_id: opt.captcha_id
            }, opt)
        }, function(err, res, body) {
            if (err) {
                return cb(err);
            }
            body = parseRes(res);
            if (body) {
                cb(null, {
                    body: body,
                    cookie_string: jar.getCookieString(HOST_URL)
                });
            }
        });
    },
    logout: function(opt, cb) {
        cb = cb || noop;
        request = request.defaults({
            jar: request.jar()
        });
        cb();
    },
    publicChannels: function(opt, cb) {
        cb = cb || noop;
        var result = [];
        each(FIXED_CHANNELS, function(name, id) {
            result.push({
                id: id,
                name: name,
            });
        });
        cb(null, result);
        return result;
    },
    personalChannels: function(opt, cb) {
        cb = cb || noop;
        var result = [{
            id : PERSONAL_CHANNEL_ID,
            name : '私人频道'
        }, {
            id : LIKED_CHANNEL_ID,
            name : '红心频道'
        }];
        cb(null, result);
        return result;
    },
    genreList: function(opt, cb) {
        cb = cb || noop;
        var result = [];
        each(GENRE_CHANNELS, function(name, id) {
            result.push({
                id: id,
                name: name,
            });
        });
        cb(null, result);
        return result;
    },
    genreChannels: function(opt, cb) {
        cb = cb || noop;
        request(getUrl('/j/explore/genre'), {
            r: random(),
            qs: getParamsWithPagination(opt)
                // opt.gid
        }, function(err, res, body) {
            if (err) {
                return cb(err);
            }
            body = parseRes(res);
            if (body) {
                var result = [];
                if (body.status) { // FIXME
                    result = body.data.channels;
                }
                cb(null, result);
            }
        });
    },
    hotChannels: function(opt, cb) {
        cb = cb || noop;
        request(getUrl('/j/explore/hot_channels'), {
            qs: getParamsWithPagination(opt),
            r: random()
        }, function(err, res, body) {
            if (err) {
                return cb(err);
            }
            body = parseRes(res);
            if (body) {
                var result = [];
                if (body.status) { // FIXME
                    result = body.data.channels;
                }
                cb(null, result);
            }
        });
    },
    upTrendingChannels: function(opt, cb) {
        cb = cb || noop;
        request(getUrl('/j/explore/up_trending_channels'), {
            qs: getParamsWithPagination(opt),
            r: random()
        }, function(err, res, body) {
            if (err) {
                return cb(err);
            }
            body = parseRes(res);
            if (body) {
                var result = [];
                if (body.status) { // FIXME
                    result = body.data.channels;
                }
                cb(null, result);
            }
        });
    },
    channelDetail: function(opt, cb) {
        cb = cb || noop;
        request(getUrl('/j/explore/channel_detail'), {
            qs: opt, // opt.channel_id
            r: random()
        }, function(err, res, body) {
            if (err) {
                return cb(err);
            }
            body = parseRes(res);
            if (body) {
                var result = null;
                if (body.status) { // FIXME
                    result = body.data.channels;
                }
                cb(null, result);
            }
        });
    },
    seachChannels: function(opt, cb) {
        cb = cb || noop;
        request(getUrl('/j/explore/search'), {
            qs: getParamsWithPagination(opt), // opt.query
            r: random()
        }, function(err, res, body) {
            if (err) {
                return cb(err);
            }
            body = parseRes(res);
            if (body) {
                var result = {};
                if (body.status) { // FIXME
                    result = body.data;
                }
                cb(null, result);
            }
        });
    },
    favChannels: function(opt, cb) {
        cb = cb || noop;
        request(getUrl('/j/fav_channels'), {
            r : random()
        }, function(err, res, body) {
            if (err) {
                return cb(err);
            }
            body = parseRes(res);
            if (body) {
                cb(null, body.channels || []);
            }
        });
    },
    favChannel: function(opt, cb) {
        cb = cb || noop;
        request(getUrl('/j/explore/fav_channel'), {
            r : random(),
            qs : opt // opt.cid
        }, function(err, res, body) {
            if (err) {
                return cb(err);
            }
            body = parseRes(res);
            if (body) {
                var result = 0;
                if (body.status) { // FIXME
                    result = body.data.res;
                }
                cb(null, result);
            }
        });
    },
    unfavChannel: function(opt, cb) {
        cb = cb || noop;
        request(getUrl('/j/explore/unfav_channel'), {
            r: random(),
            qs: opt // opt.cid
        }, function(err, res, body) {
            if (err) {
                return cb(err);
            }
            body = parseRes(res);
            if (body) {
                var result = 0;
                if (body.status) { // FIXME
                    result = body.data.res;
                }
                cb(null, result);
            }
        });
    },
    isfavChannel: function(opt, cb) {
        cb = cb || noop;
        request(getUrl('/j/explore/is_fav_channel'), {
            r: random(),
            qs: opt // opt.cid
        }, function(err, res, body) {
            if (err) {
                return cb(err);
            }
            body = parseRes(res);
            if (body) {
                var result = false;
                if (body.status) { // FIXME
                    result = body.data.res.is_fav;
                }
                cb(null, result);
            }
        });
    },
    changeChannel: function(opt, cb) {
        cb = cb || noop;
        request(getUrl('/j/change_channel'), {
            r : random(),
            qs: extend({
                area: 'system_chls'
                // opt.fcid, opt.tcid
            }, opt)
        }, function(err, res, body) {
            if (err) {
                return cb(err);
            }
            cb(null, body);
        });
    },
    playlist: function(opt, cb) {
        cb = cb || noop;
        request(getUrl('/j/mine/playlist'), {
            r: random(),
            qs: extend({
                from: 'mainsite',
                channel: 0,
                kbps: 128,
                type: 'n',
                pt: '',
                sid: ''
            }, opt)
        }, function(err, res, body) {
            if (err) {
                return cb(err);
            }
            body = parseRes(res);
            if (body) {
                var result = [];
                if (toInt(body.r) === 0) {
                    result = body.song;
                }
                cb(null, result);
            }
        });
    },
    personalPlaylist: function(opt, cb) {
        cgi.playlist(extend({}, opt, {
            channel: PERSONAL_CHANNEL_ID
        }), cb);
    },
    likedPlaylist: function(opt, cb) {
        cgi.playlist(extend({}, opt, {
            channel: LIKED_CHANNEL_ID
        }), cb);
    },
    skip: function(opt,cb) {
        cgi.playlist(extend({}, opt, {
            type: 's'
        }), cb);
    },
    like: function(opt, cb) {
        cgi.playlist(extend({}, opt, {
            type: 'r'
        }), cb);
    },
    unlike: function(opt, cb) {
        cgi.playlist(extend({}, opt, {
            type: 'u'
        }), cb);
    },
    ban: function(opt, cb) {
        cgi.playlist(extend({}, opt, {
            type: 'b'
        }), cb);
    },
    shareUrl: function(opt, cb) {
        cb = cb || noop;
        var url = getUrl('/', {
            start: sprintf('%sg%sg', opt.sid, opt.ssid)
        });
        cb(null, url);
        return url;
    }
};

module.exports = cgi;

