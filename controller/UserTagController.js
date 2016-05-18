/**
 * Created by daniel on 16/5/2.
 */

"use strict";

import express from 'express';

import Tag from '../model/Tag';
import User from '../model/User';
import UserTag from '../model/UserTag';

export default {
    create(userId, tagId) {
        return UserTag.findOrCreate({where: {user_id:userId, tag_id:tagId}}).spread((userTag, created) => {
            return userTag;
        });
    }
}
