/**
 * Created by daniel on 16/5/2.
 */
import sequelize from './index';
const Sequelize = sequelize.Sequelize;
import User from './User';
import Tag from './Tag';

const UserTagType = {
    TYPE_DEFAULT: 1
};

let UserTag = sequelize.define("user_tag", {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    type: {
        type:Sequelize.INTEGER(8),
        defaultValue: UserTagType.TYPE_DEFAULT
    },
    createTime: {
        type: Sequelize.DATE,
        field: 'create_time',
        defaultValue: Sequelize.NOW()
    }
});

UserTag.TYPE_DEFAULT = UserTagType.TYPE_DEFAULT;

UserTag.belongsTo(User, {
    foreignKey: 'user_id',
    as: 'user'
});

User.hasMany(UserTag, {
    foreignKey: 'user_id',
    as: 'userTags'
});

UserTag.belongsTo(Tag, {
    foreignKey: 'tag_id',
    as: 'tag'
});

Tag.hasMany(UserTag, {
    foreignKey: 'tag_id',
    as: 'userTags'
});


User.belongsToMany(Tag, {
    through: {
        model: UserTag
    },
    foreignKey: 'user_id',
    as: 'tags'
});

Tag.belongsToMany(User, {
    through: {
        model: UserTag
    },
    foreignKey: 'tag_id',
    as: 'users'
});

if (process.env.EDEN_SYNC_DATABASE) {
    UserTag.sync();
}


export default UserTag;