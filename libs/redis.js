/**
 * Created by daniel on 16/5/2.
 */

'use strict';

import {redisCache} from '../bin/config';
import redis from 'redis';
const client = redis.createClient(redisCache);


// FOR EXAMPLE:
//
// client.set('key', 'value', function(err, res) {
//    client.expire('key', 3, function(err, res) {
//        console.log(err);
//    });
//    console.log(err);
// });
//
// client.get('key', function(err, res) {
//    console.log(res)
// });

export default client;