const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Accessory = require('./accessory');
const User = require('./user');

const cubeSchema = new Schema({
    name: {
        type: String,
        validate: {
            validator: function(v) {
                return /^[\w\d][\w\d\s]*[\w\d]$/.test(v);       //starts with any number or english letter; includes only numbers, letters, and spaces; and ends with any number or english letter
            },
            message: props => `${props.value} must be only letters/numbers/spaces and not start or end with a space.`
        },
        minlength: 5,
        required: true
    },
    description: {
        type: String,
        validate: {
            validator: function(v) {
                return /^[\w\d][\w\d\s]*[\w\d]$/.test(v);       //starts with any number or english letter; includes only numbers, letters, and spaces; and ends with any number or english letter
            },
            message: props => `${props.value} must be only letters/numbers/spaces and not start or end with a space.`
        },
        minlength: 20,
        required: true
    },
    imageUrl: {
        type: String,
        validate: {
            validator: function(v) {
                return /^https?:\/\/\X*/.test(v);       //starts with https://
            },
            message: props => `${props.value} must start with http(s)://.`
        },
        required: true
    },
    difficulty: {
        type: Number,
        required: true
    },
    accessories: [{ type: Schema.Types.ObjectId, ref: 'Accessory'}],
    creator: { type: Schema.Types.ObjectId, ref: 'User'}
});

const Cube = mongoose.model("Cube", cubeSchema);

module.exports = Cube;