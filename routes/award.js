var express = require("express");
var router = express.Router();
// var Experience = require("../models/projects");
var expressSanitizer  = require("express-sanitizer");
router.use(expressSanitizer());

router.get('/awards', function(req, res){
    res.render('awards/awards');
});

module.exports = router;