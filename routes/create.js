var express = require('express');
var router = express.Router();
const Cube = require("../models/cube");
const User = require('../models/user');
const { check, validationResult } = require('express-validator');


/* GET create listing. */
router.get('/', function(req, res, next) {
    res.render('create', { title: 'Create Cube Page', loggedInUser: req.user });
});


// router.post('/', 
//     check('name')
//         .isLength({ min: 5 })
//         .withMessage('must be at least 5 characters long')
//         .matches(/^[\w\d][\w\d\s]*[\w\d]$/)
//         .withMessage('must contain only letters, numbers, and spaces'),

//     check('description')
//         .isLength({ min: 20 })
//         .withMessage('must be at least 20 characters long')
//         .matches(/^[\w\d][\w\d\s]*[\w\d]$/)
//         .withMessage('must contain only letters, numbers, and spaces'),

//     check('imageUrl')
//         .matches(/^https?:\/\/\X*/)
//         .withMessage('must start with "http(s)://"'),

//     function(req, res, next) {
//         console.log('create post');
//         console.log('~req', req.user);

//         const errors = validationResult(req);
//         if (!errors.isEmpty()) {
//             console.log('errors');
            
//             let newErrors = errors.array().map((e) => e.param.charAt(0).toUpperCase() + e.param.slice(1) + " " + e.msg);
//             res.render('create', {errors: newErrors});

//         } else {
//             let data = req.body;

//             let cube = new Cube({
//                 name: data.name, 
//                 description: data.description, 
//                 imageUrl: data.imageUrl, 
//                 difficulty: data.difficultyLevel,
//                 accessories: [],
//                 creator: req.user._id
//             });
//             cube.save()
//             .then((response) => {
//                 console.log(response);
//                 User.findOneAndUpdate(
//                     {_id: req.user._id}, 
//                     { $push: {"cubes": response._id}}, 
//                     { upsert: true }, 
//                     function(err) {if (err) console.log(err);}
//                 );
//                 res.redirect('/');
//             });
//         }
//     }
// );



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

    let validationErrors = cube.validateSync();
    //console.log(validationErrors);
    //console.log(Object.values(validationErrors.errors));


    if (validationErrors === undefined) {
        //save the cube, no errors, render screen without errors
        cube.save()
        .then((response) => {
            User.findOneAndUpdate(
                {_id: req.user._id}, 
                { $push: {"cubes": response._id}}, 
                { upsert: true }, 
                function(err) {if (err) console.log(err);}
            );
            res.redirect('/');
        });
        
    } else {
        //not valid, render screen with error messages
        let values = Object.values(validationErrors.errors);
        console.log('~Validation Errors:');
        values.forEach(err => {
            console.log(err.properties.path);
            console.log(err.properties.message);
            console.log('');
        });

        let displayErrors = values.map((err) => err.properties.path.charAt(0).toUpperCase() + err.properties.path.slice(1) + " " + err.properties.message);
        res.render('create', {errors: displayErrors});
    }

});

module.exports = router;
