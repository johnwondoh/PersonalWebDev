var express         = require("express"),
    mongoose        = require("mongoose"),
    bodyParser      = require("body-parser"),
    methodOverride  = require("method-override"),
    Publication     = require("./models/publications"),
    Project         = require("./models/projects"),
    User            = require("./models/user"),
    upload          = require("./models/storage"),
    seedDB          = require("./seed"),
    expressSanitizer = require("express-sanitizer"),
    passport        = require("passport"),
    LocalStrategy   = require("passport-local"),
    flash           = require("connect-flash");

var app = express();

/* packages for adding uploading files (particularly images) in our projects */
var path              = require("path"),
    crypto            = require("crypto"),
    multer            = require("multer"),
    GridFsStorage     = require("multer-gridfs-storage"),
    Grid              = require("gridfs-stream");



// const { MongoClient } = require("mongodb");
// const uri = process.env.BLOGDATATBASEURL;

// MongoClient.connect(uri,{ useNewUrlParser: true });


/* old connection approach*/
// mongoose.connect('mongodb://localhost/blogDB');
mongoose.connect(process.env.BLOGDATATBASEURL, { useNewUrlParser: true });
// console.log('database -----\n' + process.env.BLOGDATATBASEURL);

/* -- mongo connection set -- new way -- also adding gridfs --*/ 
// Mongo URI
// console.log('mongo uri');
// const mongoURI = 'mongodb://localhost/blogDB'; 
const mongoURI = process.env.BLOGDATATBASEURL;
// console.log(process.env.BLOGDATATBASEURL);
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
app.use(bodyParser.json());

/*------------------------------------------------------------*/


app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
// app.use(express.static('public'));
app.use(express.static(__dirname + "/public")); 
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









// @route GET /image/:filename
// @desc Display image with the given filename
app.get('/image/:filename', (req, res)=>{
  gfs.files.findOne({filename: req.params.filename}, (err, file)=>{
    if(!file || file.length === 0){
      return res.status(404).json({
        err: 'No file exists'
      });
    }
    // console.log(file.contentType);
    // check if file is an image
    if(file.contentType === "image/jpeg" || file.contentType === "image/png"|| file.contentType === 'image/jpeg'){
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    } else {
      // var valueType = typeof file.contentType;
      res.status(404).json({
        err: 'Not an image',
        type: file.contentType,
        typeOf: typeof file.contentType,
        imgDetails: file
      });
    }
  });
});


// @route POST /upload
// @desc uploads file to db
// app.post('/upload', upload.single('file'), (req, res)=>{
//     // res.json({file: req.file});
//     res.redirect('/');
// })


/* adding routes */ 
var researchRoutes = require("./routes/research");
var projectRoutes = require("./routes/project");
var experienceRoutes = require("./routes/experience");
var awardRoutes = require("./routes/award");
var indexRoutes = require("./routes/index");


app.use("/", researchRoutes);
app.use("/", projectRoutes);
app.use("/", experienceRoutes);
app.use("/", awardRoutes );
app.use("/", indexRoutes);


app.listen(process.env.PORT, process.env.IP, function(){
    console.log('Blog App Server listening');
})