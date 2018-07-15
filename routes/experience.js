var express = require("express");
var router = express.Router();
// var Experience = require("../models/projects");
var expressSanitizer  = require("express-sanitizer");
router.use(expressSanitizer());

router.get('/experience', function(req, res){
    res.render('experience/experience');
});

module.exports = router;

