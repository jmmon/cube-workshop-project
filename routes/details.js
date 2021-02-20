var express = require('express');
var router = express.Router();
const Cube = require('../models/cube');

/* GET details listing. */
router.get('/:uid', function(req, res, next) {
    let id = req.params.uid;
    console.log('cube id to look up:', id);    //works

    Cube.findOne({_id: id}).populate('accessories').populate('creator')
    .then((thisCube) => {
        
        //console.log(req.user);
        //console.log(req.user._doc._id);
        //console.log(Object.keys(thisCube._doc.creator._doc._id));
        // console.log(Object.values(thisCube));
        // let isCreator = true;
        let isCreator = false;
        console.log('thisCube ', ''+thisCube._doc.creator._doc._id);

        if (req.user != undefined) {
            isCreator = ((''+thisCube._doc.creator._doc._id) == (''+req.user._id));
            console.log('user id ', ''+req.user._id);
            console.log('isCreator', isCreator);
        }



        res.render('details', { title: 'Cubicle', cube: thisCube, accessories: thisCube.accessories, isCreator: isCreator, user: req.user});
    });
    
});

module.exports = router;