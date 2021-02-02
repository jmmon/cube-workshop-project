const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Accessory = require('./accessory');
const Account = require('./account');

const cubeSchema = new Schema({
    name: String,
    description: String,
    imageUrl: String,
    difficulty: Number,
    accessories: [{ type: Schema.Types.ObjectId, ref: 'Accessory'}]
    //creator: { type: Schema.Types.ObjectId, ref: 'Account'}
});

const Cube = mongoose.model("Cube", cubeSchema);

module.exports = Cube;