/**
 * Created by daniel on 16/5/17.
 */


import Request from 'request';

export default  Request.defaults({
    baseUrl: 'http://localhost:3000',
    json: true
});