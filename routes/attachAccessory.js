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

    //get all accessories which are not attached to thisCube already

    Cube.findOne({_id: id}).populate('accessories')
    .then((thisCube) => {
        console.log(thisCube);
        
        //create array which has the ids of the attached accessories
        let idArr = thisCube.accessories.map(a => {return a._id;}); 

        console.log('idArr', idArr);    //attached accessories arr

        Accessory.find()
        .then((foundAccessories) => {
             //get all accessories, then filter out any which were already attached
            let dropdownAccessories = foundAccessories.filter(acc => !idArr.includes(acc._id));

            console.log('all accessories', foundAccessories);

            console.log('accessories to add to dropdown', dropdownAccessories);
            res.render('attachAccessory', { title: 'Attach Accessory Page', cube: thisCube, dropdownAccessories: dropdownAccessories, user: req.user});
            
        });

        
    });
});

router.post('/:uid', function(req, res, next) {
    //console.log('attach accessory post');
    //console.log('~req.body', req.body);
    let selAccId = req.body.accessory;
    let cubeId = req.params.uid;
    //console.log('cube id', cubeId, '\nselected Accessory Id', selAccId);


    Cube.findOneAndUpdate(
        {_id: cubeId}, 
        { $push: {"accessories": selAccId}}, 
        { upsert: true }, 
        function(err) {if (err) console.log(err);}
    );
    Accessory.findOneAndUpdate(
        {_id: selAccId}, 
        { $push: {"cubes": cubeId}}, 
        { upsert: true }, 
        function(err) {if (err) console.log(err);
    });

    res.redirect(`/details/${cubeId}`);
});

module.exports = router;
