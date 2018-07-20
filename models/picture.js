var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");

// var pictureSchema = new mongoose.Schema({
//     username: String,
//     password: String
// });

var pictureSchema = new mongoose.Schema({
    img: { data: Buffer, contentType: String }
});

// userSchema.plugin(passportLocalMongoose); 
module.exports = mongoose.model('Picture', pictureSchema)

// module.exports = mongoose.model('User', userSchema);