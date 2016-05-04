/**
 * Created by daniel on 16/5/4.
 */
"use strict";

import Tag from '../model/Tag'

export default {
    create(name) {
        return new Promise((resolve, reject) => {
            if (name) {
                Tag.findOne({where: {name: name}}).then(resolve).catch(() => {
                    Tag.create({name: name}).then(resolve).catch(reject);
                })
            }
            else {
                reject('标签不能为空');
            }
        })
    }
}