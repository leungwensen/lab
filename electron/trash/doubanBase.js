/* jshint strict: true, undef: true, unused: true */
/* global define */

define([
    //'pastry/pastry'
    'pastry/fmt/sprintf',
    'pastry/io/fetch',
    'pastry/url/querystring',
    '../CONST'
], function(
    //pastry
    sprintf,
    fetch,
    querystring,
    CONST
) {
    'use strict';
    /*
     * @author      : 绝云（wensen.lws）
     * @description : description
     */
    function getFMUrl(path, data) {
        var url = CONST.doubanFMBaseUrl + path;
        if (data) {
            url += (
                (url.indexOf('?') ? '?' : '&') +
                querystring.stringify(data)
            );
        }
        return url;
    }
    function getApiUrl(path, data) {
        var url = sprintf('%s%s?apikey=%s',
            CONST.doubanApiBaseUrl,
            path,
            CONST.doubanApiKey
        );
        if (data) {
            url += (
                '&' +
                querystring.stringify(data)
            );
        }
        return url;
    }
    function buildFetch(method, url, data) {
        return fetch(url, {
            method: method,
            data: data || {}
        });
    }
    return {
        fmGet: function(path, data) {
            return buildFetch('GET', getFMUrl(path), data);
        },
        fmPost: function(path, data) {
            return buildFetch('POST', getFMUrl(path), data);
        },
        fmUrl: function(path, data) {
            return getFMUrl(path, data);
        },
        apiGet: function(path, data) {
            return buildFetch('GET', getApiUrl(path), data);
        },
        apiPost: function(path, data) {
            return buildFetch('POST', getApiUrl(path), data);
        },
        apiUrl: function(path, data) {
            return getApiUrl(path, data);
        },
        paginationOptions: function(start, limit) {
            return {
                start: start || 1,
                limit: limit || CONST.doubanFMDefaultPaginationLimit,
            };
        }
    };
});

