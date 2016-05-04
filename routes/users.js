'use strict';

import {Return, Success, Fail} from '../libs/return';
import express from 'express';
import needLogin from '../libs/needLogin'
let router = express.Router();
import UserController from '../controller/UserController';

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
    UserController.create(req.body).then(() => {
        res.send(Success());
    }).catch((err) => {
        res.send(Fail(err.message));
    });
});

router.put('/', needLogin(), (req, res) => {
    UserController.update(req.body).then(() => {
        res.send(Success());
    }).catch((err) => {
        res.send(Fail(err.message));
    })
});

module.exports = router;
