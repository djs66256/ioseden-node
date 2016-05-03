var express = require('express');
var router = express.Router();
var UserController = require('../controller/UserController');

/* GET users listing. */
router.get('/', function(req, res, next) {
    UserController.post()
    res.send('respond with a resource');
});

router.post('/', function(req, res, next) {
    console.log(req.body);
    UserController.create(req.body, function(err) {
        if (err) {
            res.send(err.message);
        }
        else {
            res.send("ok");
        }
    })
});

module.exports = router;
