var express = require("express");
var app = express();
var bodyParser = require('body-parser');
var errorHandler = require('errorhandler');
var methodOverride = require('method-override');
var hostname = process.env.HOSTNAME || 'localhost';
var port = 8080;
var client = require('node-rest-client').Client;
var restClient = new client();
var MS = require("mongoskin");


var dbserverip = process.argv.slice(2)[0];
console.log(ip);
var db = MS.db("mongo://" + ip + ":27017/rssApp", {native_parser: true});

app.get("/getFeed", function (req, res) {
    var url = req.query.url;
    restClient.get(url, function (data, response) {
        res.send(data);
    });
});

app.get("/addFeed", function (req, res) {
    var url = req.query.url;
    console.log(url);
    res.send("1");
});
app.use(methodOverride());
app.use(bodyParser());
app.use(express.static(__dirname + '/public'));
app.use(errorHandler());

console.log("Simple static server listening at http://" + hostname + ":" + port);
app.listen(port);