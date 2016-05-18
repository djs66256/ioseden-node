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
    },

    findByUserId(userId) {
        return new Promise((resolve, reject) => {
            User.findOne({where: {id: userId}}).then(user => {
                if (user) {
                    user.getTags().then(tags => {
                        let tagObjs = [];
                        for (let tag of tags) {
                            let tagObj = tag.toJSON();
                            delete tagObj.user_tag;
                            tagObjs.push(tagObj);
                        }
                        return tagObjs;
                    }).then(resolve).catch(reject);
                }
                else {
                    reject('用户不存在');
                }
            }).catch(reject);
        })
    }
}
