/**
 * Created by daniel on 16/5/18.
 */
/**
 * Created by daniel on 16/5/18.
 */

"use strict";

import express from 'express';
let router = express.Router();
import needLogin from '../libs/needLogin';
import UserTagController from '../controller/UserTagController';
import TagController from '../controller/TagController'
import { Fail, Success} from '../libs/return';


router.post('/user/tags', needLogin(), (req, res) => {
    let tags = req.body.tags;
    if (tags && tags instanceof Array && tags.length > 0) {
        let arr = [];
        for (let tag of tags) {
            arr.push(UserTagController.create(req.userId, tag));
        }
        if (arr.length > 0) {
            Promise.all(arr).then(() => {
                res.send(Success());
            }).catch(err => {
                res.send(Fail(err.message));
            })
        }
        else {
            res.send(Fail('参数错误'));
        }
    }
    else {
        res.send(Fail('标签不存在'))
    }
});

router.get('/user/:id/tags', (req, res) => {
    UserTagController.findByUserId(req.params.id).then(tags => {
        res.send(Success(tags));
    }).catch(err => {
        res.send(Fail(err.message));
    })
});


module.exports = router;