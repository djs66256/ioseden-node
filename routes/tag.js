/**
 * Created by daniel on 16/5/18.
 */

"use strict";

import express from 'express';
let router = express.Router();
import needLogin from '../libs/needLogin';
import UserController from '../controller/UserController';
import TagController from '../controller/TagController';
import { Fail, Success} from '../libs/return';

router.post('/tag', needLogin(), (req, res) => {
    if (req.body.name) {
        TagController.createOrFind(req.body.name).then(tag => {
            res.send(Success(tag));
        }).catch(() => {
            res.send(Fail());
        })
    }
    else {
        res.send(Fail('标签不能为空'));
    }
});

router.get('/tag/:id', needLogin(), (req, res) => {
    TagController.findById(req.params.id).then(tag => {
        res.send(Success(tag));
    }).catch(err => {
        res.send(Fail(err.message));
    })
});


module.exports = router;