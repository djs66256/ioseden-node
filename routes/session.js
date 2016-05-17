/**
 * Created by daniel on 16/5/16.
 */

"use strict";

import express from 'express';
let router = express.Router();
import UserController from '../controller/UserController';
import SessionController from '../controller/SessionController';
import { Fail, Success} from '../libs/return';

router.post('/', (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    
    UserController.find({username, password}).then( user => {
        let expireTime = 365*24*3600;
        SessionController.create({uid: user.id, expire: expireTime}).then(session => {
            res.cookie('token', session.token, {domain:'localhost', path:'/', expires:new Date(session.expireDate)});
            res.send(new Success(user));
        }).catch(err => {
            res.send(new Fail(err.message));
        });
    }).catch(err => {
        res.send(new Fail(err.message));
    })
});

router.delete('/', (req, res) => {


});

module.exports = router;