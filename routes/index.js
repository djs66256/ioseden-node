var express = require('express');
var router = express.Router();

var User = require('../model/User');
var Tag = require('../model/Tag');
var UserTag = require('../model/UserTag');

var redis = require('../libs/redis');

/* GET home page. */
router.get('/', function(req, res, next) {
    //User.create({id: 111, name: "xxxx", nickName: "hahahah"}).then(function(data) {
    //    console.log(data)
    //});
    //
    //User.update({id: 10}, { where: {id:100}}).then(function(data) {
    //    console.log(data);
    //});
    //

    //Tag.create({id: 10, name: 'sb'}).then(function(data) {
    //    console.log(data);
    //});

    //User.find({where: {id: 10}}).then(function(user){
    //
    //    console.log(user);
    //
    //    Tag.findAll({where: {id: 1}}).then(function(tags) {
    //        console.log(tags);
    //        UserTag.create({id: 8, user_id: user.id, tag_id: tags[0].id}).then(function(data) {
    //            console.log(data)
    //            data.setUser(user).setTag(data[0]).then(function(data) {
    //                console.log(data);
    //            })
    //        })
    //    })
    //});

    //UserTag.findAll({
    //    include:[{model:User, as: 'user'}, {model:Tag, as: 'tag', attributes:['name']}]
    //    //attributes: [['tag.name', 'name'], ['tag.id', 'tag_id']]
    //}).then(function(data) {
    //    console.log(data);
    //});

    //UserTag;
    //User.getTags().then(function(data) {
    //    console.log(data)
    //})

    User.findOne({where:{id: 10}}).then(function(user) {
        Tag.findAll({include:{
            model: UserTag,
            as: 'userTags',
            where: {
                user_id:user.id,
                type: UserTag.TYPE_DEFAULT
            }
        }}).then(function(tags) {
            console.log(tags);
        });
        //user.getTags({where:{user_tag:{type:1}}}).then(function(tags) {
        //    console.log(tags);
        //})
    })

    console.log(__dirname);
    res.render('index', { title: 'Express' });
});

module.exports = router;
