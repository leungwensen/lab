/* jshint strict: false, undef: true, unused: true */

var pastry = require('pastry'),
    querystring = pastry.querystring,
    json = pastry.json;

module.exports = {
    noop: function() {},
    USER_AGENT: 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_9_4) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/39.0.2150.5 Safari/537.36',
    parseRes: function(res) {
        if (res.statusCode == 200) {
            return json.parse(res.body);
        } else {
            console.error(res.request.uri, res.body);
        }
    },
    random: function() {
        return Date.now();
    },
    uuidCookie: function(prefix) {
        return pastry.uuid(prefix);
    },
    genGetUrl: function(host) {
        return function(path, qs) {
            var url = host + path;
            if (qs) {
                url += (
                    (url.indexOf('?') ? '?' : '&') +
                    querystring.stringify(qs)
                );
            }
            return url;
        };
    }
};

