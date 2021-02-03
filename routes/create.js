var express = require('express');
var router = express.Router();
const Cube = require("../models/cube");
const User = require('../models/user');


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
    cube.save()
    .then((response) => {
        console.log(response);
        User.findOneAndUpdate(
            {_id: req.user._id}, 
            { $push: {"cubes": response._id}}, 
            { upsert: true }, 
            function(err) {if (err) console.log(err);}
        );
        res.redirect('/');
    });
});

module.exports = router;
