/**
 * Created by daniel on 16/5/1.
 */
'use strict';

import sequelize from './index';
const Sequelize = sequelize.Sequelize;

var User = sequelize.define('user', {
   // name: Sequelize.STRING,
    password: {
        type: Sequelize.STRING
    },
    salt: {
        type: Sequelize.STRING(16)
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
    freezeTableName: true,
    defaultScope: {
        attributes: ['nickName','email','birthday','gender','createTime','updateTime']
    }
});

User.editableAttribute = ['nickName', 'birthday', 'gender'];

if (process.env.EDEN_SYNC_DATABASE) {
    User.sync();
}

export default User;