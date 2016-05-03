/**
 * Created by daniel on 16/5/3.
 */

'use strict';

import {httpCache as config} from '../../bin/config';

import Redis from './redis';
let redis = new Redis(config);

// TODO: cache http
export default function({
    expire=config.expire,
    getKey=(req)=>{ req.originalUrl }
} = {}) {
    return function (req, res, next) {
        let key = getKey(req);
        new Promise((resolve, reject) => {
            redis.hget(key).then((data) => {
                if (data && data.length > 0) {
                    // TODO: set header 'Content-Type' ect.
                    //res.setHeader()
                    res.setHeader('Content-Length', data.body.length);
                    res.send(data.body);
                    resolve();
                }
                else {
                    reject();
                }
            }).catch(reject);
        }).catch(() => {
            // there is no cache
            next();

            if (res.statusCode == 200 && res.body.length > 0) {
                // TODO: validate res.body
                redis.hset(key, {
                    'Content-Type': res.getHeader('Content-Type'),
                    body: res.body
                });
                // TODO: Logger
            }
        });
    }
}
