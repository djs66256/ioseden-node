/**
 * Created by daniel on 16/5/17.
 */

import request from './request';

describe('SERVER STATUS', () => {
    it('test server is running', done => {
        request.get('/', done)
    })
});