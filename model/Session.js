/**
 * Created by daniel on 16/5/16.
 */
'use strict';
import uuid from 'node-uuid';
    
class Session {
    constructor({token, uid, expire}) {
        if (token) {
            this.token = token;
        }
        else {
            this.token = uuid.v4();
        }
        this.uid = uid;
        this.expire = expire;
    }

    isExpire() {
        return true;
    }
}