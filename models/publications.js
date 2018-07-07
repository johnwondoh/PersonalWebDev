var mongoose = require("mongoose");

var publicationSchema = new mongoose.Schema({
    title: String,
    authors: String,
    venue: String,
    type: String,
    year: String,
    abstract: String,
    url: String,
    doi: String,
    created: {type: Date, default: Date.now}
});
module.exports = mongoose.model('Publication', publicationSchema);