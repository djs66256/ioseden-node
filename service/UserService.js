/**
 * Created by daniel on 16/5/2.
 */

var User = require('../model/User');

var crypto = require('crypto');
function md5 (text) {
    return crypto.createHash('md5').update(text).digest('hex');
};

module.exports = {



};