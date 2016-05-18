import sequelize from './index';
const Sequelize = sequelize.Sequelize;

let Tag = sequelize.define('tag', {
    name: Sequelize.STRING,
    createTime: {
        type: Sequelize.DATE,
        field: 'create_time',
        defaultValue: Sequelize.NOW()
    },
    updateTime: {
        type: Sequelize.DATE,
        field: 'update_time'
    }
}, {
    defaultScope: {
        attributes: ['id', 'name']
    },
    scopes: {
        all: {
            attributes: ['id', 'name', 'createTime', 'updateTime']
        }
    }
});

if (process.env.EDEN_SYNC_DATABASE) {
    Tag.sync();
}

export  default Tag;