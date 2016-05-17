/**
 * Created by daniel on 16/5/4.
 */

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

function filterValidateKey(from, keys) {
    let obj = {};
    for (let k of keys) {
        if (from[k]) {
            obj[k] = from[k];
        }
    }
    return obj;
}

export {validatePassword, filterValidateKey};