'use strict';

require("babel-core");
require('babel-core/register')({
    presets: ["es2015"],
    ignore: ["node_modules/", "app.js"],
    extensions: [".js"],
    cache: true
});
require('babel-polyfill');


var express = require('express');
var path = require('path');
//var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

// var routes = require('./routes/index');
// var users = require('./routes/users');

var app = express();

// view engine setup
//app.set('views', path.join(__dirname, 'views'));
//app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

if (app.get('env') === 'development') {
    app.use('/', function (req, res, next) {
        res.set('Access-Control-Allow-Origin', 'http://localhost:8080');
        next();
    });
}

app.use('/', require('./routes/index'));
app.use('/user', require('./routes/users'));
app.use('/session', require('./routes/session'));
app.use('/', require('./routes/tag'));
app.use('/', require('./routes/userTag'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.send({code: -1, message: err.message});
        // res.render('error', {
        //     message: err.message,
        //     error: err
        // });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.send({code: -1, message: "系统错误"});
    // res.render('error', {
    //     message: err.message,
    //     error: {}
    // });
});


module.exports = app;
