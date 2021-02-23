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

    let cube = new Cube({
        name: req.body.name, 
        description: req.body.description, 
        imageUrl: req.body.imageUrl, 
        difficulty: req.body.difficultyLevel,
        accessories: [],
        creator: req.user._id
    });

    let validationErrors = cube.validateSync();
    //console.log(validationErrors);
    //console.log(Object.values(validationErrors.errors));


    if (validationErrors === undefined) {
        //save the cube, no errors, render screen without errors

        Cube.findOneAndUpdate(
            { _id: id },
            {
                name: req.body.name,
                description: req.body.description,
                imageUrl: req.body.imageUrl,
                difficulty: req.body.difficultyLevel
            }
        ).then(cube => {
            console.log('updated cube', cube);
            res.redirect('/');
        })
        .catch(err => console.log(err));        //cube update error

        
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

        Cube.findOne({ _id: id }).populate('creator')
        .then(cube => {
            console.log('this cube had error, redirecting to this cube\'s edit page', cube);
            //res.redirect(`/edit/${id}`);
            //res.render('edit', {title: 'Edit Cube', errors: displayErrors, user: req.user, cube: cube});


            let isCreator = false;
            console.log('thisCube ', ''+cube._doc.creator._doc._id);

            if (req.user != undefined) {
                isCreator = ((''+cube._doc.creator._doc._id) == (''+req.user._id));
                console.log('user id ', ''+req.user._id);
                console.log('isCreator', isCreator);
            }

            res.render('editCubePage', { title: 'Edit Cube Page', errors: displayErrors, isCreator: isCreator, user: req.user, cube: cube});
        })
        .catch(err => console.log(err));
    }
});

module.exports = router;
