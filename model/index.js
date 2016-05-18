/**
 * Created by daniel on 16/5/1.
 */
'use strict';

//var Sequelize = require('sequelize');
import Sequelize from 'sequelize';
//var config = require('../bin/config.js').mysql;
import {mysql as config} from '../bin/config';

var sequelize = new Sequelize(config.database, config.user, config.password, {
    host: config.host,
    port: config.port,
    dialect: 'mysql',

    define: {
        freezeTableName: true,

        createdAt: 'create_time',
        updatedAt: 'update_time'
    },

    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});

export default sequelize;