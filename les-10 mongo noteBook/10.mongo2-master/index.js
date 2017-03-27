const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongodb = require("mongodb");
const ObjectID = mongodb.ObjectID;
const MongoClient = mongodb.MongoClient;
const parseGetRequest = require("./lib").parseGetRequest;
const parseData = require("./lib").parseData;

const url = "mongodb://localhost:27017/10mongo";
var database = null;

MongoClient.connect(url, function(err, db) {
	if(err) {
		console.log("Невозможно подключиться к MongoDB, ошибка: ", err);
	} else {
		database = db;
	}
});

// parse application/json
app.use(bodyParser.json());
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));

// view engine setup
//app.set('views', express.static(__dirname + '/src'));
//app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/src'));

app.get("/notebook", parseGetRequest, (req, res, next) => {
	let collection = database.collection("notebook");

	let query = req.parsedQuery;

	console.log(query);

	collection
		.find(query).toArray(function (err, result) {
			res.json(result);
		});
});

app.get("/notebook/:id", (req, res, next) => {
	let collection = database.collection("notebook");

	collection
		.find({_id: ObjectID(req.params.id)}).next(function(err, record) {
			if(err) throw new Error(err);
			res.json(record);
		});
});

app.post("/notebook", parseData, (req, res, next) => {
	let collection = database.collection("notebook");

	let add = req.validData;

	collection
		.insertOne(add, (err, result) => {
			if(err) throw new Error(err);

			res.json(result.ops[0]);
		});
});

app.put("/notebook/:id", parseData, (req, res, next) => {
	let collection = database.collection("notebook");

	let _id = req.params.id;
	let update = req.validData;

	collection
		.update({_id: ObjectID(_id)}, update, function(err, result) {
			if(err) throw new Error(err);

			update._id = _id;
			res.json(update);
		});
});

app.delete("/notebook/:id", (req, res, next) => {
	let collection = database.collection("notebook");

	let _id = req.params.id;

	collection
		.deleteOne({_id: ObjectID(_id)}, function(err, result) {
			if(err) throw new Error(err);

			res.json({status: "ok"});
		});
});


app.get("/", (req, res, next) => {
	res.render('index');
});

app.use(function(err, req, res, next) {
  // совсем упращенно
  let errorCode = err.message ? err.message : 500;
  console.log(errorCode);
  res.status(errorCode).send();
});

app.listen(3002, () => {
	console.log("App run!");
});