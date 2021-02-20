var express = require('express');
var router = express.Router();
const Cube = require('../models/cube');

/* GET search results page. */
router.get('/', function(req, res, next) {
    console.log('search get');
    let searchQuery = req.query;
    console.log('search text:', searchQuery.search);
    console.log('from', searchQuery.from, 'to', searchQuery.to);
    let from = searchQuery.from;
    let to = searchQuery.to;
    let text = searchQuery.search;       //.toLowerCase();

    if (text == '' && from == '' && to == '') {
            res.redirect('/');
    } else {

        if (from == '') {
            from = 1;
        } else if (from < 1) {
            from = 1;
        } else if (from > 6) {
            from = 6;
        }

        if (to == '') {
            to = 6;
        } else if (to > 6) {
            to = 6;
        } else if (to < 1) {
            to = 1;
        }
        
        //console.log('name:', text, 'from:', from, 'to:', to);
        Cube.find({name: new RegExp(text, "i"), difficulty: {$gte: from, $lte: to}}) //
        .then((cubes) => {
            console.log(cubes);
            res.render('search', { title: 'Search Results', cube: cubes, user: req.user });
        })
        .catch((err) => console.log(err));
    }
});

module.exports = router;
