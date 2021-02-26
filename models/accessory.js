const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Cube = require('./cube');

const accessorySchema = new Schema({
    //_id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        unique: true,
        validate: {
            validator: function(v) {
                return /^[\w\d][\w\d\s]*[\w\d]$/.test(v);       //starts with any number or english letter; includes only numbers, letters, and spaces; and ends with any number or english letter
            },
            message: `must be only letters/numbers/spaces and not start or end with a space!`
        },
        minlength: [5, 'must be at least 5 characters!'],
        required: [true, 'must have a value!']
    },
    imageUrl: {
        type: String,
        validate: {
            validator: function(v) {
                return /^https?:\/\/\X*/.test(v);       //starts with https://
            },
            message: `must start with "http(s)://"!`
        },
        required: [true, 'must be an image path!']
    },
    description: {
        type: String,
        // validate: {
        //     validator: function(v) {
        //         return /^[\w\d][\w\d\s]*[\w\d]$/.test(v);       //starts with any number or english letter; includes only numbers, letters, and spaces; and ends with any number or english letter
        //     },
        //     message: `must be only letters/numbers/spaces and not start or end with a space!`
        // },
        minlength: [20, 'must be at least 20 characters!'],
        required: [true, 'must have a value!']
    },
    cubes: [{ type: Schema.Types.ObjectId, ref: 'Cube'}]
});

const Accessory = mongoose.model("Accessory", accessorySchema);

module.exports = Accessory;