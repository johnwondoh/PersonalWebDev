var mongoose = require("mongoose");

var projectSchema = new mongoose.Schema({
    title: String,
    content: String,
    image: String,
    status: String,
    hide: String,
    created: {type: Date, default: Date.now}
});
module.exports = mongoose.model('Project', projectSchema);