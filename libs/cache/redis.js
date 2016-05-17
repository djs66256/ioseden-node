/**
 * Created by daniel on 16/5/4.
 */

import redis from 'redis';

class Redis {

    constructor(config) {
        this._client = redis.createClient(config);
        this._expire = config.expire || 60;
    }

    expire(key, expire = this._expire) {
        let _client = this._client;
        return new Promise((resolve, reject) => {
            _client.expire(key, expire, (err) => {
                if (err) reject(err);
                else resolve();
            })
        })
    }

    // set a hash table
    hset(key, value = {}, {expire=this._expire}) {
        let _client = this._client;
        let _expire = this.expire.bind(this);
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
                else _expire(key, expire).then(resolve).catch(reject)
            });
        });
    }

    // get a hash table
    hget(key) {
        let _client = this._client;
        return new Promise((resolve, reject) => {
            _client.hgetall(key, (err, res) => {
                if (err) reject(err);
                else resolve(res);
            })
        })
    }

    set(key, value, {expire=this._expire}) {
        let _client = this._client;
        let _expire = this.expire.bind(this);
        return new Promise((resolve, reject) => {
            _client.set(key, value, (err) => {
                if (err) reject(err);
                else  _expire(key, expire).then(resolve).catch(reject)
            })
        })
    }

    get(key) {
        let _client = this._client;
        return new Promise((resolve, reject) => {
            _client.get(key, (err, data) => {
                if (err) reject(err);
                else resolve(data);
            })
        })
    }

    del(key) {
        let _client = this._client;
        return new Promise((resolve, reject) => {
            _client.del(key, err => {
                if (err) reject(err);
                else resolve();
            })
        })
    }
}

export default Redis;