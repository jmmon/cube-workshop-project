var express = require('express');
var router = express.Router();
const passport = require('passport');
const Cube = require('../models/cube');
const Account = require('../models/account');
const bcrypt = require('bcrypt');
const saltRounds = 10;


/* GET homepage / "browse" */
router.get('/', function(req, res, next) {
    Cube.find()
    .then((response) => {
        res.render('index', { title: 'Cubicle', cube: response, user: req.user });
    })
    .catch((err) => console.log(err));
});






/* GET "/register */
router.get('/register', function(req, res, next) {
    console.log('register page');
    res.render('register', { title: 'Register Page' });
    
});

router.post('/register', function(req, res) {
    if (req.body.password === req.body.repeatPassword) {
        console.log('passwords match');

        Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
            if (err) {
                return res.render('register', { account : account });
            }

            passport.authenticate('local')(req, res, function () {
                res.redirect('/');
            });
        });

    } else {
        res.send('passwords do not match');
    }
});

/* POST "/register" OLD VERSION */
// router.post('/register', function(req, res, next) {
//     console.log(req.body);

//     if (req.body.password === req.body.repeatPassword) {
//         console.log('passwords match');

//         User.findOne({username: req.body.username})
//         .then((user) => {
//             if (user === null) {
//                 console.log('create user');

                
//                 bcrypt.hash(req.body.password, saltRounds)
//                 .then(function(hash) {
//                     // Store hash in your password DB.
//                     let newUser = new User({
//                         username: req.body.username,
//                         password: hash
//                     });
//                     newUser.save()
//                     .then((response) => {
//                         console.log('new user!', response);
//                         res.redirect('/login');
//                     });
//                 });
                

//             } else {
//                 console.log(user);
//                 res.send('user', req.body.username ,'already exists');

//             }
            
//         })
//         .catch(function(err) {
//             if (err) console.log(err);
//         });

//     } else {
//         res.send('passwords do not match');
//     }
// });









/* GET login listing. */
router.get('/login', function(req, res, next) {
    res.render('login', { title: 'Login Page', user: req.user });
});

router.post('/login', passport.authenticate('local'), function(req, res) {
    res.redirect('/');
})

// OLD login post
// router.post('/login', function(req, res, next) {
//     console.log(req.body);

//     User.findOne({"username": req.body.username})
//     .then(function(user) {
//         console.log('login to user', user);

//         //console.log('req.body.password', req.body.password, '    user.password', user.password)
//         bcrypt.compare(req.body.password, user.password)
//         .then(function(matched) {
//             if (matched) {
//                 console.log('Logged in successfully!');
//                 res.redirect('/');
//                 //logged in successfully!
//             } else {
//                 res.send('Wrong password');
//             }
//         })
//         .catch((err) => console.log('bcrypt err', err));

//     })
//     .catch(function(err) {
//         console.log(err);
//         res.send('Can\'t find user');
//     });
// });



//LOGOUT
router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
})


router.get('/ping', function(req, res) {
    res.status(200).send("pong!");
})





module.exports = router;
