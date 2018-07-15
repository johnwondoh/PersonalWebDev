
var request = require("request");
var Publication = require("./models/publications");

/* --- using dblp API to retrieve my publication information --- */
function seedDB(){
    var source = "http://dblp.org/search/publ/api?q=wondoh+john&format=json";
    request(source, function(error, response, body){
        if(!error && response.statusCode==200){
            var data = JSON.parse(body);
            var dataArray = data.result.hits.hit;
            for(var i=0; i<dataArray.length; i++){
                
                var dataObject = {
                    title: dataArray[i].info.title,
                    authors: buildString(dataArray[i].info.authors.author),
                    venue: dataArray[i].info.venue,
                    year: dataArray[i].info.year,
                    type: dataArray[i].info.type,
                    doi: dataArray[i].info.doi,
                    url: dataArray[i].info.url
                };
                Publication.create(dataObject, function(err, createdPublication) {
                    if(err){
                        console.log(err);
                    } else {
                        console.log(createdPublication);
                    }
                });
            }
        }
    });
}

function buildString(stringArray){
    var newString = '';
    for(var i=0; i<stringArray.length;i++){
        if(i === (stringArray.length-1)){
            newString += stringArray[i];
        } else {
            newString += stringArray[i] +', ';
        }
    }
    return newString;
}

console.log('building string');
var strArray = ['John', 'Wondoh', 'Kofi'];
console.log(buildString(strArray));

module.exports = seedDB;