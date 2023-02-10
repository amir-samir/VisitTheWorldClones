//require mongoose, passport-local-mongoose
const mongoose = require('mongoose');
const passportLocalMongoose = require('passport-local-mongoose');


//Create User Schema:
const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    phoneNumber: String,
    email: String,
    username: String,
    password: String
});

//hash password using passport-local-mongoose plugin
userSchema.plugin(passportLocalMongoose);

//export User model
module.exports = mongoose.model('User', userSchema);