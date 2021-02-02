var express = require('express');
var router = express.Router();
const User = require('../models/user');
const bcrypt = require('bcrypt');

/* GET index listing. */
router.get('/', function(req, res, next) {
    res.render('login', { title: 'Login Page' });
});

router.post('/', function(req, res, next) {
    console.log(req.body);

    User.findOne({"username": req.body.username})
    .then(function(user) {
        console.log('login to user', user);

        //console.log('req.body.password', req.body.password, '    user.password', user.password)
        bcrypt.compare(req.body.password, user.password)
        .then(function(matched) {
            if (matched) {
                console.log('Logged in successfully!');
                res.redirect('/');
                //logged in successfully!
            } else {
                res.send('Wrong password');
            }
        })
        .catch((err) => console.log('bcrypt err', err));

    })
    .catch(function(err) {
        console.log(err);
        res.send('Can\'t find user');
    });
});

module.exports = router;
