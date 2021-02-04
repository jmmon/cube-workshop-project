var express = require('express');
var router = express.Router();
const Cube = require("../models/cube");
const User = require('../models/user');
const assert = require('assert');


/* GET create listing. */
router.get('/', function(req, res, next) {
    res.render('create', { title: 'Create Cube Page', loggedInUser: req.user });
});

router.post('/', function(req, res, next) {
    console.log('create post');
    console.log('~req', req.user);
    
    let data = req.body;

    let cube = new Cube({
        name: data.name, 
        description: data.description, 
        imageUrl: data.imageUrl, 
        difficulty: data.difficultyLevel,
        accessories: [],
        creator: req.user._id
    });

    let tooEarly;       //variable to show asynchronous vs synchronous
    cube.save()
    .then((response) => {
        tooEarly = response;
        console.log('#1: this console.log waits for the data to return', tooEarly);
        User.findOneAndUpdate(
            {_id: req.user._id}, 
            { $push: {"cubes": response._id}}, 
            { upsert: true }, 
            function(err) {if (err) console.log(err);}
        );
        res.redirect('/');
    });
    console.log('#2: this console.log does not wait for the data to return', tooEarly);

});

module.exports = router;
