/**
 * Created by daniel on 16/5/3.
 */

'use strict';

import config from '../bin/config.json';
import {httpCache as config} from '../bin/config';

import redis from 'redis';
var client = redis.createClient(config);

// TODO: cache http
export function cache() {

    return function (req, res, next) {
        next();
    }
}
