var express = require("express");
var app=express();
var request = require("request");


app.set("view engine","ejs");
app.use(express.static('public'));


function get_request_results_page(host, qs, res){
    var qs=qs || "";
    var url=host+qs;
    var query=qs.substr(2, qs.length-1);
    // console.log(query);
    console.log(query);
    console.log(qs);
    console.log(qs.length);
    console.log("GET",url);
  
    request(url, function(error, response, body) {
            if(!error && (response.statusCode === 200)){
                var data= JSON.parse(body);
                data = data || {};
                res.render("results",{data:data, query:query});
            }
    });
}
function get_request_movie_page(host, qs, res){
    var qs=qs || "";
    var url=host+qs;
    var last_index=qs.length-1;
    var query=qs.substr(2, last_index);
    console.log(query);
    console.log("GET",url);
  
    request(url, function(error, response, body) {
            if(!error && (response.statusCode === 200)){
                var data= JSON.parse(body);
                data = data || {};
                res.render("movie",{data:data, query:query+""});
            }
    });
}

var host="http://www.omdbapi.com/?apikey=thewdb&";
var qs1="s=star";//search by string star

app.get("/movie/:searchId",function(req, res){
    var searchId = req.params.searchId;
    var qs1="i="+searchId;
    get_request_movie_page(host, qs1, res);
});

app.get("/",function(req, res) {
    
    var searchItem=req.query.search;
    if(searchItem){
        var qs1="s="+searchItem;
        get_request_results_page(host, qs1, res); 
    } else{
        res.render("search"); 
    }
   
});

app.get("/results", function(req, res){
    var searchItem=req.query.search;
    var qs1="s="+searchItem;
    get_request_results_page(host, qs1, res);
    //res.send("hello it works!!!");
});


// Starting listener
app.set('port', process.env.PORT || 3000);
app.set('ip', process.env.IP || "127.0.0.1");
app.listen(app.get('port'),app.get('ip'), function(){
    console.log('Server up: http://' + app.get('ip') +":"+ app.get('port'));
});