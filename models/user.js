var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
    username: String,
    photo: String,
    password: String
});
userSchema.plugin(passportLocalMongoose); 

// console.log('print something');

module.exports = mongoose.model('User', userSchema);