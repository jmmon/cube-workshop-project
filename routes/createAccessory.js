var express = require('express');
var router = express.Router();
const Accessory = require('../models/accessory');


/* GET create listing. */
router.get('/', function(req, res, next) {
    res.render('createAccessory', { title: 'Create Accessory Page', user: req.user});
});

router.post('/', function(req, res, next) {
    console.log('create accessory post');
    console.log('~req', req.body);
    let data = req.body;

    let accessory = new Accessory({
        name: data.name, 
        imageUrl: data.imageUrl, 
        description: data.description, 
        cubes: []
    });

    let validationErrors = accessory.validateSync();
    //console.log(validationErrors);
    //console.log(Object.values(validationErrors.errors));


    if (validationErrors === undefined) {
        //save the cube, no errors, render screen without errors
        accessory.save()
        .then((response) => {
            console.log(response);
            res.redirect('/');
        });
        
    } else {
        //not valid, render screen with error messages
        let values = Object.values(validationErrors.errors);
        console.log('~Validation Errors:');
        values.forEach(err => {             //console log
            console.log(err.properties.path);
            console.log(err.properties.message);
            console.log('');
        });

        let displayErrors = values.map((err) => err.properties.path.charAt(0).toUpperCase() + err.properties.path.slice(1) + " " + err.properties.message);
        res.render('createAccessory', {title: 'Create Accessory', errors: displayErrors, user: req.user});
    }
});


// router.post('/', function(req, res, next) {     //works!
//     console.log('create accessory post');
//     console.log('~req', req.body);
//     let data = req.body;

//     let accessory = new Accessory({
//         name: data.name, 
//         imageUrl: data.imageUrl, 
//         description: data.description, 
//         cubes: []
//     });
//     accessory.save()
//     .then((response) => {
//         console.log(response);
//         res.redirect('/');
//     });
// });

module.exports = router;
