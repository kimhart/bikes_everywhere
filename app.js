var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var mongoUrl = 'mongodb://localhost:27017/bikeEvents';
var ObjectId = require('mongodb').ObjectId;

var db;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

MongoClient.connect(mongoUrl, function(err, database){
	if(err){
		console.log(err);
	}
	console.log('connected');
	db = database;
	process.on("exit", db.close); 
});

app.get('/', function(req,res){
	res.send("Hello World")
});

app.get('/calendar', function(req,res){
	res.render('index');
});


app.listen(process.env.PORT || 3000);