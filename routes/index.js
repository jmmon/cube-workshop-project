var express = require('express');
var router = express.Router();
const passport = require('passport');
const Cube = require('../models/cube');
const User = require('../models/user');


/* GET homepage / "browse" */
router.get('/', function(req, res, next) {
    Cube.find()
    .then((response) => {
        res.render('index', { title: 'Cubicle', cube: response, loggedInUser: req.user });
    })
    .catch((err) => console.log(err));
});


// Ping
router.get('/ping', async function(req, res) {
    res.status(200).send("pong!");
});


module.exports = router;
