'use strict';

import {Return, Success, Fail} from '../libs/return';
import express from 'express';
import needLogin from '../libs/needLogin'
let router = express.Router();
import UserController from '../controller/UserController';
import UserTagController from '../controller/UserTagController'

/* GET users listing. */
router.get('/:id', (req, res, next) => {
    let id = req.params.id;
    if (id) {
        UserController.findByIds([id]).then((users) => {
            if (users.length > 0) {
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
    UserController.update(req.body).then((user) => {
        res.send(Success(user));
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
