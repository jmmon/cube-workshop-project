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

        let idArr = [];
        thisCube.accessories.forEach((attached) => idArr.push(attached._id));
        console.log('This cube has these accessories attached:', idArr);

        Accessory.find()
        .then((foundAccessories) => {

            let dropdownAccessories = [];
            console.log('all accessories', foundAccessories);

            foundAccessories.forEach((acc) => {
                console.log(acc);
                if (!idArr.includes(acc._id)) {
                    //if cube's accessories does not include this accessory id, we need to ad dthis accessory as a select option
                    dropdownAccessories.push(acc);
                }
            });
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
        let acc;
        Accessory.findOne({_id: selAccId})
        .then((thisAcc) => {
            acc = thisAcc;
        })
        console.log('this acc should attach to cube', acc);
        // .then((thisAcc) => {
        //     acc = thisAcc
        // })
        //thisCube.push(acc);
    });


    // let cube = new Cube({
    //     name:data.name, 
    //     description:data.description, 
    //     imageUrl:data.imageUrl, 
    //     difficulty:data.difficultyLevel,
    //     accessories: []
    // });
    // cube.save()
    // .then((response) => {
    //     console.log(response);
    //     res.redirect('/');
    // });
});

module.exports = router;
