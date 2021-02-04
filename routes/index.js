var express = require('express');
var router = express.Router();
const passport = require('passport');
const Cube = require('../models/cube');
const User = require('../models/user');
const Breakfast = require('../models/breakfast');
const assert = require('assert');


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
    
    // const badBreakfast = new Breakfast({
    //     eggs: 2,
    //     bacon: 0,
    //     drink: 'Milk'
    // });



    
    // let error = badBreakfast.validateSync();
    // assert.equal(error.errors['eggs'].message, 'Too few eggs');
    // assert.ok(!error.errors['bacon']);
    // assert.equal(error.errors['drink'].message, '`Milk` is not a valid enum value for path `drink`.');
    
    // badBreakfast.bacon = 5;
    // badBreakfast.drink = null;
    
    // error = badBreakfast.validateSync();
    // assert.equal(error.errors['drink'].message, 'Path `drink` is required.');
    
    // badBreakfast.bacon = null;
    // error = badBreakfast.validateSync();
    // assert.equal(error.errors['bacon'].message, 'Why no bacon?');





    // try {
    //     const result = await badBreakfast.save();
    //     console.log('this is the result', result);
    // } catch (err) {
    //     console.log('this is the error', err.message);

    // }



});


module.exports = router;
