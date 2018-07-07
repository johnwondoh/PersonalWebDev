var express = require("express");
var router = express.Router();
var Project = require("../models/projects");

/*--- Projects routes ---*/
router.get('/projects', function(req, res) {
    // this should retrieve projects from the database and display them
    Project.find({}, function(err, foundProjects){
        if(err){
            console.log(err);
        } else {
            res.render('projects/projects', {projects: foundProjects});
        }
    });
});


/****** CREATE and POST new Projects *******/
router.get('/projects/new', function(req, res) {
    res.render('projects/new');
});

router.post('/projects', function(req, res){
    console.log(req.body.project);
    Project.create(req.body.project, function(err, createdProject){
        if(err){
            console.log(err);
        } else {
            console.log(createdProject);
            res.redirect('/projects');
        }
    });
});

// project show page
router.get('/projects/:id', function(req, res) {
    Project.findById(req.params.id, function(err, foundProject){
        if(err){
            console.log(err);
        } else {
            res.render('projects/show', {project: foundProject});
        }
    });
});

// Edit Project
router.get('/projects/:id/edit', function(req, res) {
    Project.findById(req.params.id, function(err, foundProject){
        if(err) {
            console.log(err);
        } else {
            res.render('projects/edit', {project: foundProject});
        }
    });
    // res.render('projects/edit');
});
// updating database after edit
router.put('/projects/:id', function(req, res){
    Project.findByIdAndUpdate(req.params.id, req.body.project, function(err, updatedProject){
        if(err){
            console.log(err);
        } else {
            res.redirect('/projects/'+req.params.id);
        }
    });
});

// delete a project
router.delete('/projects/:id', function(req, res){
    Project.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log(err);
        } else {
            res.redirect('/projects');
        }
    });
});

module.exports = router;