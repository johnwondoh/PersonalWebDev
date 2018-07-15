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

var app = express();

/* packages for adding uploading files (particularly images) in our projects */
var path              = require("path"),
    crypto            = require("crypto"),
    multer            = require("multer"),
    GridFsStorage     = require("multer-gridfs-storage"),
    Grid              = require("gridfs-stream");


/* adding routes */ 
var researchRoutes = require("./routes/research");
var projectRoutes = require("./routes/project");
var experienceRoutes = require("./routes/experience");
var awardRoutes = require("./routes/award");
var indexRoutes = require("./routes/index");


/* old connection approach*/
// mongoose.connect('mongodb://localhost/blogDB');

/* -- mongo connection set -- new way -- also adding gridfs --*/ 
// Mongo URI
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
app.use(bodyParser.json());

/*------------------------------------------------------------*/


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





//create storage engine
const  storage = new GridFsStorage({
  url: mongoURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
      crypto.randomBytes(16, (err, buf) => {
        if (err) {
          return reject(err);
        }
        const filename = buf.toString('hex') + path.extname(file.originalname);
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
      });
    });
  }
});
const upload = multer({ storage });


app.post('/upload', upload.single('file'), (req, res)=>{
    // res.json({file: req.file});
    res.redirect('/');
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
    // check if file is an image
    if(file.contentType === "image/jpeg" || file.contentType === "image/png "){
      const readstream = gfs.createReadStream(file.filename);
      readstream.pipe(res);
    } else {
      res.status(404).json({
        err: 'Not an image'
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


app.use("/", researchRoutes);
app.use("/", projectRoutes);
app.use("/", experienceRoutes);
app.use("/", awardRoutes );
app.use("/", indexRoutes);


app.listen(process.env.PORT, process.env.IP, function(){
    console.log('Blog App Server listening');
})