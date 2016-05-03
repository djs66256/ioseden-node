/**
 * Created by daniel on 16/5/3.
 */

'use strict';

import {httpCache as config} from '../bin/config';

import redis from 'redis';
var client = redis.createClient(config);

// set a hash table
function hset(key, value = {}, {expire=60}) {
    return new Promise((resolve, reject) => {
        let arr = [];
        for (let [k, v] of value) {
            arr.push(k, v);
        }
        if (arr.length == 0) {
            reject(new Error("value is empty"));
        }
        client.hset(key, arr, (err) => {
            if (err) reject(err);
            else {
                // set expire timeInterval
                client.expire(key, expire, (err) => {
                    if (err) reject(err);
                    else resolve();
                })
            }
        });
    });
}

// get a hash table
function hget(key) {
    return new Promise((resolve, reject) => {
        client.hgetall(key, (err, res) => {
            if (err) reject(err);
            else resolve(res);
        })
    });
}

// TODO: cache http
export default function({
    expire=config.expire,
    getKey=(req)=>{ req.originalUrl }
} = {}) {
    return function (req, res, next) {
        let key = getKey(req);
        new Promise((resolve, reject) => {
            hget(key).then((data) => {
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
                hset(key, {
                    'Content-Type': res.getHeader('Content-Type'),
                    body: res.body
                });
                // TODO: Logger
            }
        });
    }
}
