const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

//id, username, password (hashed)

const userSchema = new Schema({
    username: {
        type: String,
        unique: true,
        validate: {
            validator: function(v) {
                return /^[\w\d]*$/.test(v);
            },
            message: props => `${props.value} must be only letters or numbers.`
        },
        minlength: [5, 'Username must be 5 or more letters'],
        required: [true, 'Username is required.']
    },
    password: {
        type: String,
        validate: {
            validator: function(v) {
                return /^[\w\d]*$/.test(v);
            },
            message: props => `${props.value} must be only letters or numbers.`
        },
        minlength: [8, 'Password must be 5 or more letters'],
        required: [true, 'Password is required.']
    },
    cubes: [{ type: Schema.Types.ObjectId, ref: 'Cube'}]
});

userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User", userSchema);

module.exports = User;


// When user is created, generate JWT and use it late for authentication and authorization
// ---or use passport with session, without jwt