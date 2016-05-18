/**
 * Created by daniel on 16/5/4.
 */
"use strict";

import Tag from '../model/Tag'

export default {
    createOrFind(name) {
        return new Promise((resolve, reject) => {
            if (name) {
                Tag.findOrCreate({where: {name: name}}).spread((tag, created) => {
                    let tagObj = tag.toJSON();
                    delete tagObj.createTime;
                    delete tagObj.updateTime;
                    return tagObj;
                }).then(resolve).catch(reject);
            }
            else {
                reject('标签不能为空');
            }
        })
    },

    findById(id) {
        return Tag.findOne({where:{id: id}}).then(tag => {
            if (tag) return tag;
            else throw new Error('标签不存在');
        });
    }
}