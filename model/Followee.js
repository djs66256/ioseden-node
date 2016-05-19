/**
 * Created by daniel on 16/5/19.
 */
'use strict';
import sequelize from './index';
const Sequelize = sequelize.Sequelize;
import User from './User';

let Followee = sequelize.define('followee', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    owner: {
        type: Sequelize.INTEGER,
        field: 'owner_id',
        references: {
            model: User,
            key: 'id'
        }
    },
    followee: {
        type: Sequelize.INTEGER,
        field: 'followee_id',
        references: {
            model: User,
            key: 'id'
        }
    },
    createTime: {
        type: Sequelize.DATE,
        field: 'create_time'
    }
}, {
    updatedAt: false
});

User.hasMany(Followee, {
    foreignKey: 'followee_id',
    as: 'followee'
});

User.hasMany(Followee, {
    foreignKey: 'owner_id',
    as: 'owner'
});

if (process.env.EDEN_SYNC_DATABASE) {
    Followee.sync();
}

export default Followee;