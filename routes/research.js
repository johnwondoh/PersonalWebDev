var express = require("express");
var router = express.Router();
var Publication = require("../models/publications");
var middleware = require("../middleware/index"); 

// Research page route
router.get('/research', function(req, res){
    Publication.find({}, function(err, publications){
        if(err){
            console.log(err);
        } else {
            // console.log(publications);
            // console.log(publications.length);
            var sortedPublications = sortObjectItems(publications);
            // console.log(sortedPublications.length);
            res.render('research/research', {publications: sortedPublications});
        }
    });
});




// console.log(publicationArray[0].year);

// console.log(sortObjectItems(publicationArray));
function sortObjectItems(objects){
    var newArray = [];
    // iterating to sort
    var temp;
    for(var i=0; i<objects.length; i++){
        if(i+1 >= objects.length){
                newArray.push(objects[i]);
        } else if(Number(objects[i].year) > Number(objects[i+1].year)) {
            temp = objects[i];
            objects[i] = objects[i+1];
            objects[i+1] = temp;
        } 
    }
    //     if(!(newArray.includes(objects[i]))){
    //         if(i+1 >= objects.length){
    //             newArray.push(objects[i]);
    //         } else if(Number(objects[i].year) > Number(objects[i+1].year)) {
    //             newArray.push(objects[i+1]);
    //             newArray.push(objects[i]);
    //         } else if(Number(objects[i].year) <= Number(objects[i+1].year)) {
    //             newArray.push(objects[i]);
    //         }
    //     }
    // }
    // iteration to check if it sorted
    for(var j=0; j<objects.length; j++){
        if(!(j+1>=objects.length)){
            if(Number(objects[j].year) > Number(objects[j+1].year)){
                return sortObjectItems(objects);
            } 
        }
    }
    return objects;
}

/****** CREATE and EDIT research entries ******/
// new page for entering new research item
router.get('/research/new', middleware.isLoggedIn, function(req, res) {
   res.render('research/new');
});
// post route for handling new research item
router.post('/research', middleware.isLoggedIn, function(req, res){
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
router.get('/research/:id/edit', middleware.isLoggedIn, function(req, res) {
    Publication.findById(req.params.id, function(err, foundPublication){
        if(err){
            console.log(err);
        } else {
            res.render('research/edit', {publication: foundPublication});
        }
    });
});
// Update research -- handling edit
router.put('/research/:id', middleware.isLoggedIn, function(req, res){
    Publication.findByIdAndUpdate(req.params.id, req.body.publication, function(err, updatedPublication){
        if(err){
            console.log(err);
        } else {
            res.redirect('/research');
        }
    });
});

router.delete('/research/:id', middleware.isLoggedIn, function(req, res){
    Publication.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log(err);
        } else {
            res.redirect('/research');
        }
    });
});

module.exports = router;
