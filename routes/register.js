var express = require('express');
var router = express.Router();
const passport = require('passport');
const User = require('../models/user');
const assert = require('assert');

/* GET "/register */
router.get('/', function(req, res, next) {
    console.log('register page');
    res.render('register', { title: 'Register Page' });
    
});

router.post('/', function(req, res) {
    if (req.body.password === req.body.repeatPassword) {
        console.log('passwords match');

        User.register(new User({ username : req.body.username }), req.body.password, function(err, user) {
            if (err) {
                return res.render('register', { error: err.message });
            }

            passport.authenticate('local')(req, res, function () {
                req.session.save(function(err) {
                    if (err) {
                        return next(err);
                    }
                    res.redirect('/');
                });
            });
        });

    } else {
        res.send('passwords do not match');
    }
});

module.exports = router;
