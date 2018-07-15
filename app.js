var express         = require("express"),
    mongoose        = require("mongoose"),
    bodyParser      = require("body-parser"),
    methodOverride  = require("method-override"),
    Publication     = require("./models/publications"),
    Project         = require("./models/projects"),
    User            = require("./models/user"),
    seedDB          = require("./seed"),
    expressSanitizer = require("express-sanitizer"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    flash           = require("connect-flash");

var researchRoutes = require("./routes/research");
var projectRoutes = require("./routes/project");
var experienceRoutes = require("./routes/experience");
var awardRoutes = require("./routes/award");
var indexRoutes = require("./routes/index");

mongoose.connect('mongodb://localhost/blogDB');

var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(methodOverride("_method"));
// Adds my publications to the database - only required once
// seedDB();
app.use(expressSanitizer());
// using connect-flash for flash messages
app.use(flash());


/********PASSPORT Configuration*********/
app.use(require("express-session")({
    secret: "Regina is the precious",
    resave: false,
    saveUninitialized : false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// specifying a middle to send current user to all routes so that 
// login, logout, and sign up buttons can be displayed based on the 
// login status of the user, i.e., if they are logged in or not
app.use(function(req, res, next){
    // adding users to all ejs (html) templates
    res.locals.currentUser = req.user;
    //Adding flash messages to all ejs (html) templates
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});








app.use("/", researchRoutes);
app.use("/", projectRoutes);
app.use("/", experienceRoutes);
app.use("/", awardRoutes );
app.use("/", indexRoutes);


app.listen(process.env.PORT, process.env.IP, function(){
    console.log('Blog App Server listening');
})