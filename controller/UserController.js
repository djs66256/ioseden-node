/**
 * Created by daniel on 16/5/2.
 */

import User from '../model/User';
import crypto from 'crypto';

function md5(text) {
    return crypto.createHash('md5').update(text).digest('hex');
}

function validatePassword(password) {
    return new Promise(function (resolve, reject) {
        if (password.length >= 6) {
            resolve();
        }
        else {
            reject(new Error("密码不能小于6位"));
        }
    });
}

class Controller {
    
    create(user) {
        return new Promise((resolve, reject) => {
            if (user.email && user.password) {
                validatePassword(user.password)
                    .then(() => {
                        User.create(user).then(resolve).catch(reject(err));
                    })
                    .catch(reject);
            }
            else {
                reject(new Error("用户名或密码为空"));
            }
        });
    }

    update(user) {
        return new Promise((resolve, reject) => {
            if (user.id) {
                return reject(new Error("用户ID为空"));
            }
            User.update(user, {
                where: {
                    id: user.id
                }
            }).then(resolve).catch(reject);

        })
    }
}

export default Controller;
