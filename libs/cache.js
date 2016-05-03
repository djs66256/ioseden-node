/**
 * Created by daniel on 16/5/3.
 */
var config = require('../bin/config.json').httpCache;
var redis = require('redis');
var client = redis.createClient(config);

// TODO: cache http
module.exports = function(config) {

    return function (req, res, next) {
        next();
    }
}