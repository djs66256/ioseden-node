/**
 * Created by daniel on 16/5/4.
 */

import redis from 'redis';

class Redis {

    constructor(config) {
        this.client = redis.createClient(config);
    }

    // set a hash table
    hset(key, value = {}, {expire=60}) {
        let _client = this.client;
        return new Promise((resolve, reject) => {
            let arr = [];
            for (let [k, v] of value) {
                arr.push(k, v);
            }
            if (arr.length == 0) {
                reject(new Error("value is empty"));
            }
            _client.hset(key, arr, (err) => {
                if (err) reject(err);
                else {
                    // set expire timeInterval
                    _client.expire(key, expire, (err) => {
                        if (err) reject(err);
                        else resolve();
                    })
                }
            });
        });
    }

    // get a hash table
    hget(key) {
        let _client = this.client;
        return new Promise((resolve, reject) => {
            _client.hgetall(key, (err, res) => {
                if (err) reject(err);
                else resolve(res);
            })
        });
    }

}