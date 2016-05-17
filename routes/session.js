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
    let username = req.param('username');
    let password = req.param('password');
    
    UserController.find({username, password}).then( user => {
        SessionController.create();
    }).catch(err => {
        res.send(new Fail(err.message));
    })
});

router.delete('/', (req, res) => {


});

module.exports = router;