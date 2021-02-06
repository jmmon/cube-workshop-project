var express = require('express');
var router = express.Router();
const passport = require('passport');
const User = require('../models/user');

/* GET "/register */
router.get('/', function(req, res, next) {
    console.log('register page');
    res.render('register', { title: 'Register Page' });
});


router.post('/register', function(req, res) {
    console.log('register post');
    console.log('name', req.body.username);
    console.log('pass', req.body.password);
    console.log('passRepeat', req.body.repeatPassword);
    if (req.body.password === req.body.repeatPassword) {
        console.log('passwords match');

        let newUser = new User({ username : req.body.username, password: req.body.password });
        let validationErrors = newUser.validateSync();
        if (validationErrors === undefined) {
            //register user
            User.register(new User({ username : req.body.username }), req.body.password, function(err, user) {
                if (err) {
                    console.log(err);
                    res.send('Error:\n', err);
    
                } else {
                    //authenticate the session with the user
                    passport.authenticate('local')(req, res, function () {
                        req.session.save(function(err) {
                            if (err) {
                                return next(err);
                            }
                            res.redirect('/');
                        });
                    });
                }
            });

        } else {
            //display errors

            let values = Object.values(validationErrors.errors);
            console.log('~Validation Errors:');
            values.forEach(err => {
                console.log(err.properties.path);
                console.log(err.properties.message);
                console.log('');
            });

            let displayErrors = values.map((err) => err.properties.path.charAt(0).toUpperCase() + err.properties.path.slice(1) + " " + err.properties.message);
            res.render('register', {errors: displayErrors});

        }

        // User.register(new User({ username : req.body.username }), req.body.password, function(err, user) {
        //     if (err.name == 'ValidationError') {
        //         console.log(err);
        //         res.render('register', { error: err.message });

        //     } else {
        //         //authenticate the session with the user
        //         passport.authenticate('local')(req, res, function () {
        //             req.session.save(function(err) {
        //                 if (err) {
        //                     return next(err);
        //                 }
        //                 res.redirect('/');
        //             });
        //         });
        //     }
        // });

    } else {
        res.render('register', {errors: 'passwords do not match'});
    }
});


// router.post('/', function(req, res) {
//     let err;
//     if (req.body.password === req.body.repeatPassword) {
//         console.log('passwords match');
//         let user = new User({
//             username: req.body.username,
//             password: req.body.password
//         });
//         User.create(user)
//         .then(response)
//     } else {
//         res.render('register', {error: 'Passwords do not match'});
//     }

    
//     err = user.validateSync();

//     if (err) {
//         let string = '';
//         // for (let eachErr of err.errors) {
//         //     string += eachErr.message;
//         //     string +='\n';
//         // }
//         console.log('err', err.errors);
//         console.log('string', string);
//         res.render('register', {error: err.errors});
//     }

//     // User.register(new User({ username : req.body.username }), req.body.password, function(err, user) {
//     //     if (err.name == 'ValidationError') {
//     //         console.log('Validating error!', err.errors);
//     //         res.render('register', { title: 'Register Page', error: err.errors.password });
//     //         //res.status(422).json(err);
//     //     } else {
//     //         console.log(err);
//     //         res.status(500).json(err);
//     //     }

//     //     passport.authenticate('local')(req, res, function () {
//     //         req.session.save(function(err) {
//     //             if (err) {
//     //                 return next(err);
//     //             }
//     //             res.redirect('/');
//     //         });
//     //     });
//     // })


    
// });

module.exports = router;
