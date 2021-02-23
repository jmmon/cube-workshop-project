var express = require('express');
var router = express.Router();
const Cube = require('../models/cube');


/* GET homepage / "browse" */
router.get('/', function(req, res, next) {
    Cube.find()
    .then((response) => {
        res.render('index', { title: 'Cubicle', cube: response, user: req.user });
    })
    .catch((err) => console.log(err));
});


// Ping
router.get('/ping', async function(req, res) {
    res.status(200).send("pong!");
});


router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});


module.exports = router;
