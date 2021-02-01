const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//id, username, password (hashed)

const userScema = new Schema({
    username: String,
    password: String
});

const User = mongoose.model("User", userScema);

module.exports = User;


//When user is created, generate JWT and use it late for authentication and authorization