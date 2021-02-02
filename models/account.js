const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMongoose = require('passport-local-mongoose');

//id, username, password (hashed)

const accountSchema = new Schema({
    username: String,
    password: String
});

accountSchema.plugin(passportLocalMongoose);

const Account = mongoose.model("Account", accountSchema);

module.exports = Account;


// When user is created, generate JWT and use it late for authentication and authorization
// ---or use passport with session, without jwt