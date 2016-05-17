/**
 * Created by daniel on 16/5/16.
 */
'use strict';
import uuid from 'node-uuid';
    
class Session {
    constructor({token = null, uid, expire=0, expireDate=null}) {
        if (token) {
            this.token = token;
        }
        else {
            this.token = uuid.v4();
        }
        this.uid = uid;
        if (expireDate) {
            this.expireDate = expireDate;
        }
        else {
            this.expireDate = new Date().getTime() + expire;
        }
    }

    isExpire() {
        return new Date().getTime() > this.expireDate;
    }
}

export default Session;