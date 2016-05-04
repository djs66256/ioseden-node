/**
 * Created by daniel on 16/5/2.
 */

import User from '../model/User';
import Tag from '../model/Tag';
import crypto from 'crypto';
import {validatePassword, filterValidateKey} from '../libs/validate'

function md5(text) {
    return crypto.createHash('md5').update(text).digest('hex');
}

function salt(key) {
    return md5(key).splice(0, 15);
}

function encryptPassword(password, salt) {
    let mixPassword = password + "<+>" + salt;
    return md5(mixPassword);
}

let Controller = {

    create({email=null, password=null} = {}) {
        return new Promise((resolve, reject) => {
            if (email && password) {
                validatePassword(password).then(() => {
                    User.findOne({email: email}).then((user) => {
                        if (user) return reject("您已经注册,请直接登录");
                        else {
                            let salt = salt(email);
                            let encryptPassword = encryptPassword(password, salt);
                            User.create({
                                email: email,
                                password:encryptPassword,
                                salt: salt
                            }).then(resolve).catch(reject(err));
                        }
                    }).catch(reject);

                }).catch(reject);
            }
            else {
                reject(new Error("用户名或密码为空"));
            }
        });
    },

    update(user) {
        return new Promise((resolve, reject) => {
            if (user.id) {
                return reject(new Error("用户ID为空"));
            }
            if (user.password && user.salt) {
                return reject(new Error("参数非法"));
            }

            User.update(filterValidateKey(user, User.editableAttribute), {
                where: {
                    id: user.id
                }
            }).then(resolve).catch(reject);
        })
    },

    findByIds(ids = []) {
        return new Promise((resolve, reject) => {
            User.findAll({
                where: { id: { $in: ids } },
                include: {
                    model: Tag,
                    as: 'tags'
                }
            }).then(resolve).catch(reject)
        })
    }
}

export default Controller;
