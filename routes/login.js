var express = require('express');
var router = express.Router();
const passport = require('passport');


/* GET login listing. */
router.get('/', function(req, res, next) {
    res.render('login', { title: 'Login Page', user: req.user });
});

router.post('/', function(req, res, next) {
    passport.authenticate('local', function(err, user, info) {
      if (err) { return next(err); }
      if (!user) { return res.render('login', { title: 'Login Page', user: req.user, errors: ['Username or password incorrect.'] }); }     //failure
      req.logIn(user, function(err) {
        if (err) { return next(err); }
        return res.redirect('/');   //success
      });
    })(req, res, next);
  });

  
module.exports = router;
