/**
 * Created by daniel on 16/5/1.
 */

var Sequelize = require('sequelize');
var sequelize = require('./index');


var User = sequelize.define('user', {
    id: Sequelize.INTEGER,
    name: Sequelize.STRING,
    password: {
        type: Sequelize.STRING
    },
    salt: {
        type: Sequelize.CHAR(8)
    },
    nickName: {
        type: Sequelize.STRING,
        field: 'nick_name'
    },
    email: {
        type: Sequelize.STRING,
        validate: {
            isEmail: true
        }
    },
    birthday: Sequelize.DATE,
    gender: Sequelize.INTEGER(8),
    createTime: {
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW(),
        field: 'nick_name'
    },
    updateTime: {
        type: Sequelize.DATE,
        field: 'update_time'
    },
    loginTime: {
        type: Sequelize.DATE,
        field: 'login_time'
    }
}, {
    timestamps: false,
    freezeTableName: true
});

module.exports = User;