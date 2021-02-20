var express = require('express');
var router = express.Router();
const Cube = require('../models/cube');

/* GET index listing. */
router.get('/:uid', function(req, res, next) {
    let id = req.params.uid;
    console.log('edit cube page id', id);

    Cube.findOne({_id: id}).populate('creator')
    .then((thisCube) => {
        console.log('found thisCube', thisCube);
        console.log(req.user);
        // let isCreator = (''+thisCube.creator == ''+req.user._id) ? true : false;
        // console.log('thisCube creator ', ''+thisCube.creator);
        // console.log('user id ', ''+req.user._id);
        // console.log('isCreator', isCreator);

        let isCreator = false;
        console.log('thisCube ', ''+thisCube._doc.creator._doc._id);

        if (req.user != undefined) {
            isCreator = ((''+thisCube._doc.creator._doc._id) == (''+req.user._id));
            console.log('user id ', ''+req.user._id);
            console.log('isCreator', isCreator);
        }

        res.render('editCubePage', { title: 'Edit Cube Page', cube: thisCube, isCreator: isCreator, user: req.user});
        //res.render('index', { title: 'Edit Cube Page', cube: thisCube, user: req.user});
    });
});

router.post('/:uid', function(req, res, next) {
    let id = req.params.uid;
    console.log(id);
    

    Cube.updateOne(
        { _id: id },
        {
            name: req.body.name,
            description: req.body.description,
            imageUrl: req.body.imageUrl,
            difficulty: req.body.difficultyLevel

        },
        err => console.log(err)
    );
    res.redirect('/');
})
module.exports = router;
