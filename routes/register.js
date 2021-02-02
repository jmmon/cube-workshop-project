var express = require('express');
var router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');
const saltRounds = 10;

/* GET index listing. */
router.get('/', function(req, res, next) {
    console.log('register page');
    res.render('register', { title: 'Register Page' });
    
});

router.post('/', function(req, res, next) {
    console.log(req.body);

    User.findOne({username: req.body.username})
    .then((user) => {
        if (user === null) {
            console.log('create user');

            if (req.body.password === req.body.repeatPassword) {
                console.log('passwords match');

                bcrypt.hash(req.body.password, saltRounds)
                .then(function(hash) {
                    // Store hash in your password DB.
                    let newUser = new User({
                        username: req.body.username,
                        password: hash
                    });
                    newUser.save()
                    .then((response) => {
                        console.log('new user!', response);
                        res.redirect('/login');
                    });
                });
            } else {
                res.send('passwords do not match');
            }

        } else {
            console.log(user);
            res.send('user', req.body.username ,'already exists');

        }
        
    })
    .catch(function(err) {
        if (err) console.log(err);
    });
});

module.exports = router;
