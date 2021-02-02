var express = require('express');
var router = express.Router();
const cubes = require('../config/database.json');
const Cube = require('../models/cube');

/* GET home page. */
router.get('/', function(req, res, next) {
    console.log('search get');
    let searchQuery = req.query;
    console.log('search text:', searchQuery.search);
    console.log('from', searchQuery.from, 'to', searchQuery.to);
    let min = searchQuery.from;
    let max = searchQuery.to;
    let text = searchQuery.search;       //.toLowerCase();

    if (text == '' && min == '' && max == '') {
            res.redirect('/');
    } else {

        if (min == '') {
            min = 1;
        } else if (min < 1) {
            min = 1;
        } else if (min > 6) {
            min = 6;
        }

        if (max == '') {
            max = 6;
        } else if (max < 1) {
            max = 1;
        } else if (max > 6) {
            max = 6;
        }
        
        //console.log('name:', text, 'from:', min, 'to:', max);
        Cube.find({'name': new RegExp(text, "i"), 'difficulty': {$gte: min, $lte: max}}) //
        .then((cubes) => {
            console.log(cubes);
            res.render('search', { title: 'Search Cubes', cube: cubes });
        })
        .catch((err) => console.log(err));

        //render based off the three search parameters: string (blank or someText), min difficulty, max difficulty

        // let filteredCubes = cubes.filter(cube => (cube.name.toLowerCase().includes(text) || cube.description.toLowerCase().includes(text) || cube.id.toLowerCase().includes(text)) && (cube.difficulty >= min && cube.difficulty <= max));
        
        // let empty = filteredCubes.length > 0 ? false: true;

        // res.render('search', {title: "Search Cubes", cubes: filteredCubes, empty: empty});
    }
});

module.exports = router;
