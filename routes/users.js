'use strict';

import {Return, Success, Fail} from '../libs/return';
import express from 'express';
let router = express.Router();
import UserController from '../controller/UserController';

/* GET users listing. */
router.get('/', (req, res, next) => {

    res.send('respond with a resource');
});

router.post('/', function(req, res, next) {
    UserController.create(req.body).then(() => {
        res.send(Success());
    }).catch((err) => {
        res.send(Fail(err.message));
    });
});

module.exports = router;
