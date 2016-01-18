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
	res.render('index');
});

app.get('/calendar', function(req,res){
	res.render('calendar');
});

app.get('/calendar/events', function(req,res){
	db.collection('events').find({}).toArray(function(err,results){
		res.json(results);
	});	
});

app.get("/calendar/:event",function(req,res){
	db.collection('events').findOne({name: req.params.event},function(err,result){
		res.json(result);
	})
})

app.post("/calendar/:event/comment", function(req,res){
	db.collection('events').update({name:req.params.event},{$push:{comments:req.body}},function(err,result){
		res.json(req.body);
		})
})

app.post('/calendar/:event/rsvp', function(req,res){
	db.collection('events').update({name:req.params.event},{$push:{rsvps: req.body}},function(err,result){
		res.json(req.body);
	})
})
		


app.listen(process.env.PORT || 3000);



