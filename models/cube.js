const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const cubeSchema = new Schema({
    name: String,
    description: String,
    imageUrl: String,
    difficulty: Number
});

const Cube = mongoose.model("Cube", cubeSchema);

module.exports = Cube;