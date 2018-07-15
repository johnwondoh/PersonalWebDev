var express = require("express");
var router = express.Router();
// var Experience = require("../models/projects");
var expressSanitizer  = require("express-sanitizer");
router.use(expressSanitizer());

var passport = require("passport");
var User     = require("../models/user");


/********* Routes *************/
// Home page route
router.get('/', function(req, res){
    res.render('home');
});

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