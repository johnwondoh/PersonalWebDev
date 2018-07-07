var express         = require("express"),
    mongoose        = require("mongoose"),
    bodyParser      = require("body-parser"),
    methodOverride  = require("method-override"),
    Publication     = require("./models/publications"),
    Project         = require("./models/projects"),
    seedDB          = require("./seed");

var researchRoutes = require("./routes/research");
var projectRoutes = require("./routes/project");

mongoose.connect('mongodb://localhost/blogDB');

var app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(methodOverride("_method"));
// Adds my publications to the database - only required once
// seedDB();


/********* Routes *************/
// Home page route
app.get('/', function(req, res){
    res.render('home');
});





app.use("/", researchRoutes);
app.use("/", projectRoutes);


app.listen(process.env.PORT, process.env.IP, function(){
    console.log('Blog App Server listening');
})