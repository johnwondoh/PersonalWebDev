var express = require("express"),
    request = require("request");

var app = express();

app.set('view engine', 'ejs');
app.use(express.static('public'));



/********* Routes *************/
// Home page route
app.get('/', function(req, res){
    res.render('home');
});

// Research page route
app.get('/research', function(req, res){
    // using dblp API to retrieve my publication information
    var source = "http://dblp.org/search/publ/api?q=wondoh+john&format=json";
    
    request(source, function(error, response, body){
        if(!error && response.statusCode==200){
            var data = JSON.parse(body);
            // console.log(data.result.hits.hit);
            res.render('research', {publicationData: data.result.hits.hit});
        }
    });
});

app.get('/projects', function(req, res) {
    // this should retrieve projects from the database and display them
    res.render('projects/projects');
});


/****** CREATE and POST new Projects*******/
app.get('/projects/new', function(req, res) {
    res.render('projects/new');
});


app.listen(process.env.PORT, process.env.IP, function(){
    console.log('Blog App Server listening');
})