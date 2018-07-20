var express = require("express");
var mongoose = require("mongoose");
var bodyParser = require("body-parser");
var router = express.Router();

var Project = require("../models/projects");
var upload = require("../models/storage");
var expressSanitizer  = require("express-sanitizer");
var middleware = require("../middleware/index"); 
router.use(expressSanitizer());


/*===============================================================================*/

/* file upload stuff here */

/* packages for adding uploading files (particularly images) in our projects */
var path              = require("path"),
    crypto            = require("crypto"),
    multer            = require("multer"),
    GridFsStorage     = require("multer-gridfs-storage"),
    Grid              = require("gridfs-stream");
    
const mongoURI = 'mongodb://localhost/blogDB'; 
// Create mongo connection
const conn = mongoose.createConnection(mongoURI);
// init gfs
let gfs;
// connect, and ensure it is openned before assigning gfs
conn.once('open', () => {
    // initiation stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});
router.use(bodyParser.json());

/*===============================================================================*/

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
router.get('/projects/new', middleware.isLoggedIn, function(req, res) {
    res.render('projects/new');
});

// console.log(upload)
router.post("/projects", middleware.isLoggedIn, upload.single('image'), function(req, res) {
// router.post('/projects', middleware.isLoggedIn, upload.single('image'), (req, res) => {
    // console.log(req.body.project);
    var newProject = req.body.project;
    // newProject.image = req.file.filename;
    // console.log(newProject);
    // newProject.images.push(req.file.filename);
    newProject.content = req.sanitize(newProject.content); 
    Project.create(newProject, function(err, createdProject){
        if(err){
            console.log(err);
        } else {
            // console.log(createdProject);
            createdProject.images.push(req.file.filename);
            createdProject.save();
            // console.log(createdProject);
            res.redirect('/projects');
        }
    });
});

// app.post('/upload', upload.single('file'), (req, res)=>{
//     // res.json({file: req.file});
//     res.redirect('/');
// });

// project show page
router.get('/projects/:id', function(req, res) {
    Project.findById(req.params.id, function(err, foundProject){
        if(err){
            console.log(err);
        } else {
            // console.log(typeof foundProject.image);
            // console.log(foundProject.image);
            res.render('projects/show', {project: foundProject});
        }
    });
});

// Edit Project
router.get('/projects/:id/edit', middleware.isLoggedIn, function(req, res) {
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
router.put('/projects/:id', middleware.isLoggedIn, upload.single('image'), function(req, res){
    var edittedProject = req.body.project;
    // console.log(edittedProject);
    edittedProject.content = req.sanitize(edittedProject.content); 
    Project.findByIdAndUpdate(req.params.id, edittedProject, function(err, updatedProject){
        if(err){
            console.log(err);
        } else {
            updatedProject.images.push(req.file.filename);
            updatedProject.save();
            res.redirect('/projects/'+req.params.id);
        }
    });
});

// delete a project
router.delete('/projects/:id', middleware.isLoggedIn, function(req, res){
    Project.findByIdAndRemove(req.params.id, function(err){
        if(err){
            console.log(err);
        } else {
            res.redirect('/projects');
        }
    });
});

/*---------------------------------------------------------------------------------------------------*/
/*                                 project photo page management                                     */
/*---------------------------------------------------------------------------------------------------*/
// show the images page for a given project
router.get('/projects/:id/images', function(req, res) {
    Project.findById(req.params.id, function(err, foundProject) {
        if(err){
            console.log(err);
            return res.redirect('/projects/'+req.params.id);
        }
        res.render('projects/images', {project: foundProject});
    });
});

// delete an image in the images path
router.delete('/projects/:id/images/:imageName', middleware.isLoggedIn, function(req, res){
    gfs.remove({_id: req.params.imageName, root: 'uploads'}, (err, gridStore)=>{
        if(err){
            return res.status(404).json({
            err: err
            });
        }
        // console.log('IMAGE REMOVED');
        Project.findById(req.params.id, function(err, foundProject) {
            // console.log('IN PROJECT');
            if(err){
                return res.status(404).json({
                err: err
                });
            }
            // console.log('FOUND PROJECT');
            var index = foundProject.images.indexOf(req.params.imageName);
            // console.log('Index of image: ' + index);
            if(index > -1){
                // console.log('--- In splice ---');
                foundProject.images.splice(index, 1);
                foundProject.save();
            }
        });
        res.redirect('/projects/'+req.params.id+'/images');
    });
});

/*---------------------------------------------------------------------------------------------------*/

module.exports = router;