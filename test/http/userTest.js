/**
 * Created by daniel on 16/5/17.
 */

"use strict";

import request from './request';
import {} from 'chai-as-promised'
import { should, shouldNot } from './should'

describe('User Api', () => {
    describe('/user', () => {
        let api = '/user';
        describe('POST', () => {
            it('user can not be null', done => {
                request.post({ url: api, form: {} }, (err, res, body) => {
                    if (err) done(err);
                    else if (body.code != 1) done();
                    else done(new Error('user can not be null'));
                })
            });
            it('username must be email', done => {
                request.post({ url: api, form: {username: 'daniel', password:'123123abc' }}, (err, res, body) => {
                    if (err) done(err);
                    else if (body.code == 1) done(new Error('username must be email'));
                    else done();
                })
            });
            it('should be pass', done => {
                request.post({ url: api, form: {username: 'daniel@163.com', password:'123123abc' }}, (err, res, body) => {
                    if (err) done(err);
                    else if (body.code == 1) done();
                    else done(new Error(body.message));
                })
            });

            it('account (username) must be unique', done => {
                request.post({ url: api, form: {username: 'daniel@163.com', password:'123123abc' }}, (err, res, body) => {
                    if (err) done(err);
                    else if (body.code == 1) done(new Error('account is not unique'));
                    else done();
                })
            });
        });

        describe('GET', ()=>{
            it('can not get a user not exists', done => {
                request.get('/user/123123', (err, res, body) => {
                    if (err) done(err);
                    else if (body.code == 1) done(new Error('should not exist this user'));
                    else done();
                });
            });

            it('can not get a user not exists v2', done => {
                request.get('/user/', (err, res, body) => {
                    if (err) done(err);
                    else if (body.code == 1) done(new Error('should not exist this user'));
                    else done();
                });
            });

            it('should get a user exists', done => {
                request.post({url: '/user', form: {username: 'daniel123@163.com', password:'123123abc' }}, (err, res, body) => {
                    if (err || body.code != 1) done(err || new Error(body.message));
                    else {
                        let user = body.data;
                        request.get('/user/' + user.id, (err, res, body) => {
                            if (err) done(err);
                            else if (body.code == 1
                                && body.data.id
                                && body.data.id == user.id
                                && body.data.email == user.email) done();
                            else done(new Error(body.message || '用户不存在'));
                        })
                    }
                })
            });

        });


        let user = {username: 'daniel233@163.com', password: '123123abc'};
        beforeEach((done) => {
            request.post({url: '/user', form: user}, (err, res, body) => {
                if (err) done (err);
                else if (body.code != 1) done(new Error(body.message));
                else done();
            });
        });

        describe('/session', () => {
            describe('POST', () => {
                it('can not login with nil username & password', done => {
                    request.post({url: '/session', form:{}}, shouldNot(done, 'can not login'));
                });

                it('can not login with nil password', done => {
                    request.post({url: '/session', form:{username:user.username}}, shouldNot(done, 'can not login'));
                });

                it('can not login with error username & password', done => {
                    request.post({url: '/session', form:{username:user.username, password:'123123'}}, shouldNot(done, 'can not login'));
                });

                it('shouldLogin', done => {
                    request.post({url: '/session', form: user}, should(done));
                });
            });
        });
    });
});
