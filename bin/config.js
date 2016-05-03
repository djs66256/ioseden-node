'use strict';

   var mysql = {
        host: "localhost",
        port: 3306,
        database: "eden",
        user: "root",
        password: ""
    },
    redisCache = {
        host: "localhost",
        port: 6379,
        user: "",
        password: "",
        db: 2,
        prefix: "eden",
        expire: 60*60
    },
    httpCache = {
        host: "localhost",
        port: 6379,
        user: "",
        password: "",
        db: 3,
        prefix: "eden",
        expire: 60*60
    };


export {mysql, redisCache, httpCache};