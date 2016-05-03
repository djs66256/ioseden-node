/**
 * Created by daniel on 16/5/2.
 */

var User = require('../model/User');
var crypto = require('crypto');

function md5 (text) {
    return crypto.createHash('md5').update(text).digest('hex');
};

var Controller = {
    validatePassword: function(password, callback) {
        if (password.length >= 6) {
            callback(null);
        }
        else {
            callback(new Error("密码不能小于6位"));
        }
    },

    create: function(user, callback) {
        if (user.email && user.password) {
            this.validatePassword(user.password, function(err) {
                if (err) {
                    callback(err);
                }
                else {
                    User.create(user).then(function(data) {
                        callback(null);
                    }).error(function(err) {
                        callback(err);
                    });
                }
            })
        }
        else {
            callback(new Error("用户名或密码为空"));
        }
    },

    update: function(user, callback) {
        if (user.id) {
            callback(new Error("用户ID为空"));
        }
        User.update(user, {
            where: {
                id: user.id
            }
        }).then(function(data) {
            callback(null, data.get());
        }).error(function(err) {
            callback(err);
        });
    }
};

module.exports = Controller;
