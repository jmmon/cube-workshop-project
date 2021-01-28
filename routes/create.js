var express = require('express');
var router = express.Router();
const Cube = require("../models/cube");


/* GET create listing. */
router.get('/', function(req, res, next) {
    res.render('create', { title: 'Create Cube Page' });
});

router.post('/', function(req, res, next) {
    console.log('create post');
    console.log('~req', req.body);
    let data = req.body;

    let cube = new Cube({
        name:data.name, 
        description:data.description, 
        imageUrl:data.imageUrl, 
        difficulty:data.difficultyLevel
    });
    cube.save()
    .then((response) => {
        console.log(response);
        res.redirect('/');
    });
});

module.exports = router;
