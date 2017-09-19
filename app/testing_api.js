var request = require("request");

var host="http://www.omdbapi.com/?apikey=thewdb&";
var qs1="s=star";//search by string star
var qs2="i=tt0080684";// search by id
var qs3="i=tt0080684&plot=full&tomatoes=true";



function get_request_parse_data(host, qs){
    var qs=qs || "";
    var url=host+qs;
    console.log("GET",url);
  
    request(url, function(error, response, body) {
            if(!error && (response.statusCode === 200)){
                var parsedData= JSON.parse(body);
                console.log('body parsed: ', parsedData);
                
            }
    });
}

get_request_parse_data(host,qs1);

get_request_parse_data(host,qs2);

get_request_parse_data(host,qs3);