/**
 * Created by daniel on 16/5/19.
 */
'use strict';
import sequelize from './index';
const Sequelize = sequelize.Sequelize;
import User from './User';

let Follower = sequelize.define('follower', {
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
    follower: {
        type: Sequelize.INTEGER,
        field: 'follower_id',
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

User.hasMany(Follower, {
    foreignKey: 'follower_id',
    as: 'follower'
});

User.hasMany(Follower, {
    foreignKey: 'owner_id',
    as: 'owner'
});

if (process.env.EDEN_SYNC_DATABASE) {
    Follower.sync();
}

export default Follower;