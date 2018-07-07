var express = require("express");
var router = express.Router();
var Publication = require("../models/publications");

// Research page route
router.get('/research', function(req, res){
    Publication.find({}, function(err, publications){
        if(err){
            console.log(err);
        } else {
            // console.log(publications);
            res.render('research/research', {publicationData: publications});
        }
    });
});

/****** CREATE and EDIT research entries ******/
// new page for entering new research item
router.get('/research/new', function(req, res) {
   res.render('research/new');
});
// post route for handling new research item
router.post('/research', function(req, res){
    var newPublication = req.body.publication;
    Publication.create(newPublication, function(err, createdPublication){
        if(err){
            console.log(err);
            res.render('/research/new');
        } else {
            res.redirect('/research');
        }
    });
    // res.redirect('/research');
});
/* -- edit research request*/
router.get('/research/:id/edit', function(req, res) {
    Publication.findById(req.params.id, function(err, foundPublication){
        if(err){
            console.log(err);
        } else {
            res.render('research/edit', {publication: foundPublication});
        }
    });
});
// Update research -- handling edit
router.put('/research/:id', function(req, res){
    Publication.findByIdAndUpdate(req.params.id, req.body.publication, function(err, updatedPublication){
        if(err){
            console.log(err);
        } else {
            res.redirect('/research');
        }
    });
});

router.delete('/research/:id', function(req, res){
    Publication.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log(err);
        } else {
            res.redirect('/research');
        }
    });
});

module.exports = router;
