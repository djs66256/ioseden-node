var sequelize = require('./index');
var Sequelize = sequelize.Sequelize;

var Tag = sequelize.define('tag', {
    name: Sequelize.STRING,
    createTime: {
        type: Sequelize.DATE,
        field: 'create_time',
        defaultValue: Sequelize.NOW()
    }
}, {
    timestamps: false,
    freezeTableName: true
});

module.exports = Tag;