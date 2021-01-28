var express = require('express');
var router = express.Router();
const Cube = require('../models/cube');

/* GET details listing. */
router.get('/:uid', function(req, res, next) {
    let id = req.params.uid;
    console.log(id);    //works

    Cube.findOne({_id: id})
    .then((response) => {
        res.render('details', { title: 'Cubicle', cube: response });
    });
    
});

// router.post('/:uid', function(req, res, next) {
//     let id = req.params.uid;
//     console.log(id);
// });

module.exports = router;