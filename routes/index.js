var express = require("express");
var router = express.Router();
var upload = require("../models/storage");

// var fs = require('fs');
// const fileUpload = require('express-fileupload');
// router.use(fileUpload());// use express-fileupload as default parser for multipart/form-data encoding


// var Experience = require("../models/projects");
var expressSanitizer  = require("express-sanitizer");
router.use(expressSanitizer());

var passport = require("passport");
var User     = require("../models/user");
// var Picture  = require("../models/picture");


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
            //   console.log('Image --- Numbe -----' + i);
            //   console.log(files[i]);
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

// profile pictutre post
router.post('/upload', upload.single('file'), (req, res)=>{
    // res.json({file: req.file});
    // console.log(req.file);
    res.redirect('/');
});

// setting up local user registration
function userSignUp(username, password){
    console.log('function called');
    var newUser = new User({username: username});
    User.register(newUser, password, function(err, user){
        console.log('in user.register');
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
// console.log('after sign up' );

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

// // temporary image route
// router.get('/image', function(req, res) {
//     Picture.find({}, function(err, foundPictures){
//         if(err){
//             console.log(err);
//         } else {
//             res.render('image', {pictures: foundPictures});
//         }
//     });
//     // res.render('image');
// });

// // temporary post request
// router.post('/image', function(req, res){
//     var picture = new Picture;
//     // console.log(req.files);
//     // console.log(req.body.file);
//     // picture.img.data = req.files.data;
//     picture.img.data = fs.readFileSync(req.files.data);
//     picture.img.contentType = 'image/png';
//     picture.save(function (err, savedPicture){
//         if (err) {
//             console.log('----------------------------------------');
//             console.log('An Error Occurred While Saving the Image');
//             console.log('----------------------------------------');
//             console.log(err);
//             res.redirect('/');
//         } else {
//             console.log('----------------------------------------');
//             console.log('     Image was Saved Successfully');
//             console.log('----------------------------------------');
//             console.log(savedPicture);
//             res.redirect('/');
//         }
//     });
// });


/*=====================================================================================*/
/*--
mongoose.connection.on('open', function () {
  console.error('mongo is open');

  // empty the collection
  Picture.remove(function (err) {
    if (err) throw err;

    console.error('removed old docs');

    // store an img in binary in mongo
    var a = new A;
    a.img.data = fs.readFileSync(imgPath);
    a.img.contentType = 'image/png';
    a.save(function (err, a) {
      if (err) throw err;

      console.error('saved img to mongo');

      // start a demo server
      var server = express.createServer();
      server.get('/', function (req, res, next) {
        A.findById(a, function (err, doc) {
          if (err) return next(err);
          res.contentType(doc.img.contentType);
          res.send(doc.img.data);
        });
      });

      server.on('close', function () {
        console.error('dropping db');
        mongoose.connection.db.dropDatabase(function () {
          console.error('closing db connection');
          mongoose.connection.close();
        });
      });

      server.listen(3333, function (err) {
        var address = server.address();
        console.error('server listening on http://%s:%d', address.address, address.port);
        console.error('press CTRL+C to exit');
      });

      process.on('SIGINT', function () {
        server.close();
      });
    });
  });

});
--*/
/*=====================================================================================*/







module.exports = router;