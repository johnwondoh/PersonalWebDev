var express = require("express");
var router = express.Router();
// var Experience = require("../models/projects");
var expressSanitizer  = require("express-sanitizer");
router.use(expressSanitizer());

var passport = require("passport");
var User     = require("../models/user");


/*--------------------------------------------------*/
var mongoose = require("mongoose"),
    path              = require("path"),
    crypto            = require("crypto"),
    multer            = require("multer"),
    GridFsStorage     = require("multer-gridfs-storage"),
    Grid              = require("gridfs-stream");
    
// Mongo URI
const mongoURI = 'mongodb://localhost/blogDB'; 
// Create mongo connection
const conn = mongoose.createConnection(mongoURI);

// init gfs
let gfs;

conn.once('open', () => {
    // initiation stream
  gfs = Grid(conn.db, mongoose.mongo);
  gfs.collection('uploads');
});
/*--------------------------------------------------*/


/********* Routes *************/
// Home page route
router.get('/', function(req, res){
    // res.render('home');
    gfs.files.find().toArray((err, files)=>{
        //check if files exist
        if(!files || files.length === 0){
          res.render('home', {file: false});
        } else {
          // map is a high level JS array -- you can learn more about this
          files.map(file => {
            if(file.contentType ==="image/jpeg" || file.contentType === "image/png"){
              file.isImage = true;
            } else {
              file.isImage = false;
            }
          });
        //   console.log(files);
          for(var i=files.length-1; i >= 0; i--){
              console.log('Image --- Numbe -----' + i);
              console.log(files[i]);
              if(files[i].isImage){
                  return res.render('home', {file: files[i]});
              }
          }
          res.render('home', {files: files});
        }
    });
});
// old version
// router.get('/', function(req, res){
    // res.render('home');
// });



// setting up local user registration
function userSignUp(username, password){
    var newUser = new User({username: username});
    User.register(newUser, password, function(err, user){
        if(err){
            console.log('Error occurred while creating new user');
            console.log(err);
        } else{
            console.log('New User is being created');
            passport.authenticate('local')(function(){
                console.log(user);
            });
        }
    });
}
// console.log('We are in the index route');
// userSignUp('johnwondoh', 'jay1000');

// login route
router.get('/login', function(req, res){
    res.render('login');
});

//handling login
router.post('/login',  passport.authenticate('local',
    {
        successRedirect: '/',
        failureRedirect: '/login'
    }), function(req, res){
});


// handling logout
router.get('/logout', function(req, res) {
    req.logout();
    // req.flash("success", "logged you out");
    res.redirect('/');
});

module.exports = router;