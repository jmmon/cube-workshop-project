const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Accessory = require('./accessory');

const cubeSchema = new Schema({
    //_id: mongoose.Schema.Types.ObjectId,
    //creatorId: String,        //new to save which user created it
    name: String,
    description: String,
    imageUrl: String,
    difficulty: Number,
    accessories: [{ type: Schema.Types.ObjectId, ref: 'Accessory'}]
});

const Cube = mongoose.model("Cube", cubeSchema);

module.exports = Cube;