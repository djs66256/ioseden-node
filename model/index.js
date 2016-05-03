/**
 * Created by daniel on 16/5/1.
 */
var Sequelize = require('sequelize');
var config = require('../bin/config.json').mysql;

var sequelize = new Sequelize(config.database, config.user, config.password, {
    host: config.host,
    port: config.port,
    dialect: 'mysql',

    pool: {
        max: 5,
        min: 0,
        idle: 10000
    }
});

module.exports = sequelize;