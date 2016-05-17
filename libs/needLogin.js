/**
 * Created by daniel on 16/5/3.
 */
"use strict";

import SessionController from '../controller/SessionController'
import { Fail } from './return'

// TODO: validate token
export default function() {
    return function(req, res, next) {
        function needLogin() {
            res.send(new Fail('请先登录'));
        }
        let token = req.cookies.token;
        if (token) {
            SessionController.find(token).then(session => {
                req.userId = session.uid;
                next();
            }).catch(needLogin);
        }
        else {
            needLogin();
        }
    };
};
