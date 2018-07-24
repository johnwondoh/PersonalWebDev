var mongoose = require("mongoose");
// var passportLocalMongoose = require("passport-local-mongoose");

var profileSchema = new mongoose.Schema({
    picture: String
});

// userSchema.plugin(passportLocalMongoose); 
module.exports = mongoose.model('Profile', profileSchema);

// module.exports = mongoose.model('User', userSchema);