var mongoose = require("mongoose");

var projectSchema = new mongoose.Schema({
    title: String,
    content: String,
    // image: String,
    images: [String],
    // images: [{
    //     image: String
    // }],
    status: String,
    hide: String,
    summary: String,
    created: {type: Date, default: Date.now}
});
module.exports = mongoose.model('Project', projectSchema);