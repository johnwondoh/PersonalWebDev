
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

// console.log('building string');
// var strArray = ['John', 'Wondoh', 'Kofi'];
// console.log(buildString(strArray));

module.exports = seedDB;


/*===================================================================*/
/*                          Here for testing                         */
/*===================================================================*/
// var publicationArray =[
//     { 
//         title: 'Dynamic temporal constraints in business processes.',
//         authors: 'John Wondoh, Georg Grossmann, Markus Stumptner',
//         venue: 'ACSW',
//         year: '2017',
//         type: 'Conference and Workshop Papers',
//         doi: '10.1145/3014812.3014848',
//         url: 'https://dblp.org/rec/conf/acsw/WondohGS17',
//     },
//     { 
//         title: 'Utilising bitemporal information for business process contingency management.',
//         authors: 'John Wondoh, Georg Grossmann, Markus Stumptner',
//         venue: 'ACSW',
//         year: '2016',
//         type: 'Conference and Workshop Papers',
//         doi: '10.1145/2843043.2843045',
//         url: 'https://dblp.org/rec/conf/acsc/WondohGS16',
//      },
//     { 
//         title: 'Contingency Management for Event-Driven Business Processes.',
//         authors: 'John Wondoh, Georg Grossmann, Markus Stumptner',
//         venue: 'OTM Conferences',
//         year: '2017',
//         type: 'Conference and Workshop Papers',
//         doi: '10.1007/978-3-319-69462-7_21',
//         url: 'https://dblp.org/rec/conf/otm/WondohGS17',
//     },
//     { 
//         title: 'Propagation of Event Content Modification in Business Processes.',
//         authors: 'John Wondoh, Georg Grossmann, Markus Stumptner',
//         venue: 'ICSOC',
//         year: '2016',
//         type: 'Conference and Workshop Papers',
//         doi: '10.1007/978-3-319-46295-0_5',
//         url: 'https://dblp.org/rec/conf/icsoc/WondohGS16',
//     },
//     { 
//         title: 'Bitemporal Support for Business Process Contingency Management.',
//         authors: 'John Wondoh, Georg Grossmann, Dragan Gasevic, Manfred Reichert, Michael Schrefl, Markus Stumptner',
//         venue: 'ER Workshops',
//         year: '2015',
//         type: 'Conference and Workshop Papers',
//         doi: '10.1007/978-3-319-25747-1_11',
//         url: 'https://dblp.org/rec/conf/er/WondohGGRSS15',
//     }
// ];