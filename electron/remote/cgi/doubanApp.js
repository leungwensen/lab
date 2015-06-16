/* jshint strict: false, undef: true, unused: true */

const HOST = 'www.douban.com';
const HOST_URL = 'http://www.douban.com';
const APP_NAME = 'radio_desktop_win';
const APP_VERSION = 100;
const APP_FROM = 'mainsite';

var pastry = require('pastry'),
    //sprintf = pastry.sprintf,
    //querystring = pastry.querystring,
    extend = pastry.extend;

var utils = require('./utils'),
    noop = utils.noop,
    getUrl = utils.genGetUrl(HOST_URL),
    parseRes = utils.parseRes;

var headers = {
        Referer: HOST_URL,
        Host: HOST,
        Cookie: utils.uuidCookie('bid='),
        'User-Agent': utils.USER_AGENT
    },
    request = require('request').defaults({
        jar: true,
        headers: headers
    }),
    defaultParams = {
        app_name: APP_NAME,
        version: APP_VERSION,
        from: APP_FROM
    };

function getParams(params) {
    return extend({}, defaultParams, params);
}
function getParamsWithUserInfo(params) {
    return extend({}, defaultParams, {
        token:  cgi._userInfo.token,
        expire: cgi._userInfo.expire,
        user_id: cgi._userInfo.user_id
    }, params);
}

var cgi = {
    _userInfo: {},
    authFromCache: function(cache) {
        extend(cgi._userInfo, cache);
    },
    login: function(opt, cb) {
        cb = cb || noop;
        request(getUrl('/j/app/login'), {
            method: 'POST',
            qs: getParams({
                email: opt.email,
                password: opt.password
            }),
            form: true
        }, function(err, res, body) {
            if (err) {
                return cb(err);
            }
            body = parseRes(res);
            if (body) {
                cgi._userInfo = body;
                cb(null, body);
            }
        });
    },
    logout: function() {
        cgi._userInfo = {};
    },
    userInfo: function(opt, cb) {
        cb = cb || noop;
        request(getUrl('/j/app/radio/user_info'), {
            qs : getParamsWithUserInfo(opt)
        }, function(err, res, body) {
            if (err) {
                return cb(err);
            }
            body = parseRes(res);
            if (body) {
                cb(null, body);
            }
        });
    },
    channels: function(opt, cb) {
        cb = cb || noop;
        request(getUrl('/j/app/radio/channels'), {
            qs: getParamsWithUserInfo(opt)
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
    playlist: function(opt, cb) {
        cb = cb || noop;
        request(getUrl('/j/app/radio/people'), {
            qs: getParamsWithUserInfo(extend({
                type: 'n',
                pt: '',
                kps : '192'
                // opt.channel, opt.sid
            }, opt))
        }, function (err, res, body) {
            if (err) {
                return cb(err);
            }
            body = parseRes(res);
            if (body) {
                cb(null, body.song || []);
            }
        });
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
    }
};

module.exports = cgi;

