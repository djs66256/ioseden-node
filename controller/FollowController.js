/**
 * Created by daniel on 16/5/19.
 */
'use strict';
import Follower from '../model/Follower';
import Followee from '../model/Followee';
import User from '../model/User';

let Controller = {

    follow({from, to}) {
        function validate() {
            return new Promise((resolve, reject) => {
                if (from == to) {
                    resolve();
                }
                else {
                    reject(new Error('自己不能关注自己'));
                }
            });
        }
        function createFollower() {
            return new Promise((resolve, reject) => {
                User.findOne({where: {id: to}}).then(user => {
                    if (user) {
                        user.addFollower([from]).then(resolve).catch(reject);
                    }
                    else {
                        throw new Error('用户不存在');
                    }
                }).catch(reject);
            });
        }
        function createFollowee() {
            return new Promise((resolve, reject) => {
                User.findOne({where: {id: from}}).then(user => {
                    if (user) {
                        user.addFollowee([to]).then(resolve).catch(reject);
                    }
                    else {
                        throw new Error('用户不存在');
                    }
                }).catch(reject);
            });
        }
        return Promise.all([validate(), createFollower(), createFollowee()]);
    },

    deleteFollow({from, to}) {

    },

    findFollowers({userId, offset=0, limit=20}) {

    },

    findFollowees({userId, offset=0, limit=20}) {

    }
};

export default Controller;