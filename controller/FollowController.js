/**
 * Created by daniel on 16/5/19.
 */
'use strict';
import Follower from '../model/Follower';
import Followee from '../model/Followee';
import User from '../model/User';
import Sequelize from 'sequelize';

let Controller = {

    follow({from, to}) {
        function validate() {
            return new Promise((resolve, reject) => {
                if (from != to) {
                    resolve(true);
                }
                else {
                    reject(new Error('自己不能关注自己'));
                }
            });
        }
        function createFollower() {
            return Follower.findOrCreate({ where:{ owner: to, follower: from }}).spread((data, created) => {
                return created;
            });
        }
        function createFollowee() {
            return Followee.findOrCreate({ where:{ owner: from, followee: to }}).spread((data, created) => {
                return created;
            });
        }
        return Promise.all([validate(), createFollower(), createFollowee()]).then(data => {
            if (data[1] && data[2]) {
                return true;
            }
            else {
                throw new Error('你已经关注该用户');
            }
        });
    },

    deleteFollow({from, to}) {
        function deleteFollower() {
            return Follower.destroy({where:{owner: to, follower: from}});
        }
        function deleteFollowee() {
            return Followee.destroy({where:{owner: from, followee: to}});
        }

        return Promise.all([deleteFollower(), deleteFollowee()]).then(arr => {
            if (arr[0] && arr[0]) {
                return true;
            }
            else {
                throw new Error('你还未关注该用户');
            }
        });
    },

    findFollowers({userId, offset=0, limit=20}) {
        return  User.scope('safe').findAndCountAll({
            offset, limit,
            include: {
                model: Follower,
                as: 'follower',
                attributes: [],
                where: {
                    owner: userId
                }
            }
        });
    },

    findFollowees({userId, offset=0, limit=20}) {
        return User.scope('safe').findAndCountAll({
            offset, limit,
            include: {
                model: Followee,
                as: 'followee',
                attributes: [],
                where: {
                    owner: userId
                }
            }
        });
    }
};

export default Controller;