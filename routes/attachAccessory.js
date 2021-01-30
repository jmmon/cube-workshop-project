var express = require('express');
var router = express.Router();
const Cube = require("../models/cube");
const Accessory = require('../models/accessory');

/* GET create listing. */
router.get('/:uid', function(req, res, next) {
    console.log('get attachAccessory');
    // res.render('attachAccessory', { title: 'Attach Accessory Page'})


    let id = req.params.uid;             
    console.log(id);    //works
    Cube.findOne({_id: id}).populate('accessories')
    .then((thisCube) => {
        console.log(thisCube);
        //get all accessories which are not attached to thisCube already

        let idArr = thisCube.accessories.map(a => {return a._id;});

        console.log('idArr', idArr);

        Accessory.find()
        .then((foundAccessories) => {
            let dropdownAccessories = foundAccessories.filter(acc => !idArr.includes(acc._id));

            console.log('all accessories', foundAccessories);

            console.log('accessories to add to dropdown', dropdownAccessories);
            res.render('attachAccessory', { title: 'Attach Accessory Page', cube: thisCube, dropdownAccessories: dropdownAccessories});
            
        })

        
    });
});

router.post('/:uid', function(req, res, next) {
    console.log('attach accessory post');
    //console.log('~req.body', req.body);
    let selAccId = req.body.accessory;

    let cubeId = req.params.uid;
    console.log('cube id', cubeId, '\nselected Accessory Id', selAccId);

    Cube.findOne({_id: cubeId})
    .then((thisCube) => {
        thisCube.accessories.push(selAccId);
        thisCube.save(function (err, thisCube) {
            if (err) return console.error(err);
        });
    });

    Accessory.findOne({_id: selAccId})
    .then((thisAcc) => {
        console.log(thisAcc);
        thisAcc.cubes.push(cubeId);
        thisAcc.save(function (err, thisAcc) {
            if (err) return console.error(err);
        });
    });
    res.redirect(`/details/${cubeId}`);
});

module.exports = router;
