'use strict';

import {Return, Success, Fail} from '../libs/return';
import express from 'express';
import needLogin from '../libs/needLogin'
let router = express.Router();
import UserController from '../controller/UserController';
import UserTagController from '../controller/UserTagController'
import SessionController from '../controller/SessionController'

/* GET users listing. */
router.get('/:id', (req, res, next) => {
    let id = req.params.id;
    if (id) {
        UserController.findByIds([id]).then((users) => {
            if (users.length == 1) {
                res.send(Success(users[0]));
            }
            else {
                res.send(Fail('用户不存在'));
            }
        }).catch((err) => {
            res.send(Fail(err.message));
        })
    }
    else {
        res.send(Fail("参数错误"));
    }
});

router.get('/', needLogin(), (req, res, next) => {
    UserController.findByIds([req.userId]).then(users => {
        if (users.length == 1) {
            res.send(Success(users[0]));
        }
        else {
            res.send(Fail('用户不存在'));
        }
    }).catch(() => {
        res.send(Fail('用户不存在'));
    });
});

router.post('/', (req, res) => {
    UserController.create({
        email: req.body.username,
        password: req.body.password
    }).then((user) => {
        res.send(Success(user));
    }).catch((err) => {
        res.send(Fail(err.message));
    });
});

router.put('/', needLogin(), (req, res) => {
    if (req.body && Object.keys(req.body).length) {
        let user = req.body;
        user.id = req.userId;
        UserController.update(user).then((data) => {
            res.send(Success(data));
        }).catch((err) => {
            res.send(Fail(err.message));
        });
    }
    else {
        res.send(Success());
    }
});

router.put('/password', needLogin(), (req, res) => {
    UserController.updatePassword({
        userId: req.userId,
        oldPassword: req.body.oldPassword,
        newPassword: req.body.newPassword
    }).then(() => {
        res.clearCookie('token');
        SessionController.delete(req.cookies.token);
        res.send(Success());
    }).catch((err) => {
        res.send(Fail(err.message));
    })
});

router.post('/tag', needLogin(), (req, res) => {
    UserTagController.create({userId: 1, tagIds: [1,2,3]}).then().catch((err) => {
        res.send(Fail(err.message));
    })
});

module.exports = router;
