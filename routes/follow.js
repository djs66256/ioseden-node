/**
 * Created by daniel on 16/5/19.
 */

"use strict";

import express from 'express';
let router = express.Router();
import needLogin from '../libs/needLogin';
import {Return, Success, Fail} from '../libs/return';
import FollowController from '../controller/FollowController';

router.post('/user/followee/:id', needLogin(), (req, res) => {
    let ownerId = req.userId;
    let followeeId = req.params.id;
    FollowController.follow({from: ownerId, to: followeeId}).then(() => {
        res.send(Success());
    }).catch(err => {
        res.send(Fail(err.message));
    });
});

router.delete('/user/followee/:id', needLogin(), (req, res) => {
    let ownerId = req.userId;
    let followeeId = req.params.id;
    FollowController.deleteFollow({from: ownerId, to: followeeId}).then(() => {
        res.send(Success());
    }).catch(err => {
        res.send(Fail(err.message));
    });
});

router.get('/user/:id/followers', (req, res) => {
    FollowController.findFollowers({
        userId: req.params.id,
        limit: req.body.limit,
        offset: req.body.offset
    }).then(followers => {
        res.send(Success(followers));
    }).catch(err => {
        res.send(Fail(err.message));
    });
});

router.get('/user/followers', needLogin(), (req, res) => {
    FollowController.findFollowers({
        userId: req.userId,
        limit: req.body.limit,
        offset: req.body.offset
    }).then(followers => {
        res.send(Success(followers));
    }).catch(err => {
        res.send(Fail(err.message));
    });
});

router.get('/user/:id/followees', (req, res) => {
    FollowController.findFollowees({
        userId: req.params.id,
        limit: req.body.limit,
        offset: req.body.offset
    }).then(followees => {
        res.send(Success(followees));
    }).catch(err => {
        res.send(Fail(err.message));
    });
});

router.get('/user/followees', needLogin(), (req, res) => {
    FollowController.findFollowees({
        userId: req.userId,
        limit: req.body.limit,
        offset: req.body.offset
    }).then(followees => {
        res.send(Success(followees));
    }).catch(err => {
        res.send(Fail(err.message));
    });
});

module.exports = router;