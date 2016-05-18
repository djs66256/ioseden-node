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
    createTime: {
        type: Sequelize.DATE,
        field: 'create_time'
    }
}, {
    updatedAt: false
});

User.belongsToMany(User, {
    through: {
        model: Follower
    },
    foreignKey: 'follower_id',
    as: 'follower'
});

User.belongsToMany(User, {
    through: {
        model: Follower
    },
    foreignKey: 'owner_id',
    as: 'owner'
});

if (process.env.EDEN_SYNC_DATABASE) {
    Follower.sync();
}

export default Follower;