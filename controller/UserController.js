/**
 * Created by daniel on 16/5/2.
 */

"use strict";

import User from '../model/User';
import Tag from '../model/Tag';
import crypto from 'crypto';
import {validatePassword, filterValidateKey} from '../libs/validate'

function md5(text) {
    return crypto.createHash('md5').update(text).digest('hex').toString();
}

function getSalt(key) {
    return md5(key).slice(0, 15);
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
                    User.scope('safe').findOne({where: {email: email}}).then((user) => {
                        if (user) return reject(new Error("您已经注册,请直接登录"));
                        else {
                            let salt = getSalt(email);
                            let encryptedPassword = encryptPassword(password, salt);
                            User.scope('safe').create({
                                email: email,
                                password:encryptedPassword,
                                salt: salt
                            }).then(data => {
                                let user = data.toJSON();
                                delete user.password;
                                delete user.salt;
                                return user;
                            }).then(resolve).catch(reject);
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
            if (!user.id) {
                return reject(new Error("用户ID为空"));
            }
            if (user.password && user.salt) {
                return reject(new Error("参数非法"));
            }
            console.log(filterValidateKey(user, User.editableAttribute))
            User.update(filterValidateKey(user, User.editableAttribute), {
                where: {
                    id: user.id
                }
            }).then(resolve).catch(reject);
        })
    },

    updatePassword({userId, oldPassword, newPassword}) {
        return new Promise((resolve, reject) => {
            if (!userId) {
                reject(new Error('用户不存在'));
            }
            else if (oldPassword == newPassword && oldPassword) {
                reject(new Error('新密码不能与旧密码一样'));
            }
            else {
                User.scope('all').findOne({where: {id: userId}}).then(user => {
                    if (user) {
                        let oldEncryptPassword = encryptPassword(oldPassword, user.salt);
                        if (oldEncryptPassword == user.password) {
                            validatePassword(newPassword).then(() => {
                                let newEncryptPassword = encryptPassword(newPassword, user.salt);
                                User.update({
                                    password: newEncryptPassword
                                }, {
                                    where: {id: userId}
                                }).then(resolve).catch(reject);
                            }).catch(reject);
                        }
                        else {
                            reject(new Error('密码错误'));
                        }
                    }
                    else {
                        reject(new Error('用户不存在'));
                    }
                }).catch(reject);
            }
        });
    },

    findByIds(ids = []) {
        return new Promise((resolve, reject) => {
            User.scope('safe').findAll({
                where: { id: { $in: ids } },
                include: {
                    model: Tag,
                    as: 'tags'
                }
            }).then(resolve).catch(reject)
        })
    },

    find({ username, password } = {}) {
        return new Promise((resolve, reject) => {
            if (username && password) {
                User.scope('all').findOne({
                    where: { email: username}
                }).then(user => { return user.toJSON()}).then((user)=> {
                    if (user.password && user.password == encryptPassword(password, user.salt)) {
                        delete user.password;
                        delete user.salt;
                        resolve(user);
                    }
                    else {
                        reject(new Error('账号或密码错误'));
                    }
                }).catch(reject);
            }
            else {
                reject(new Error('用户不存在'));
            }
        });
    },

    addTags(tagIds = []) {

    }
}

export default Controller;
