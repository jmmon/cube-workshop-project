var express = require('express');
var router = express.Router();
const Cube = require('../models/cube');

/* GET index listing. */
router.get('/', function(req, res, next) {
    Cube.find()
    .then((response) => {
        res.render('index', { title: 'Cubicle', cube: response });
    });
    
});

module.exports = router;
