const express = require("express");
let app = module.exports = express();

let User = require("./User.schema");

app.get("/", (req, res) => {

	User
		.find().exec(function (err, result) {
			res.json(result);
		});
});

app.post("/", (req, res) => {

	let names = req.body.name.split(',');
	let nameInsert = names.map((nameVal) => { return {name: nameVal.trim()}; });

	User
		.create(nameInsert, (err, result) => {
			if(err) throw new Error(err);

			res.json(nameInsert);
		});
});

app.put("/:id", (req, res) => {

	let _id = req.params.id;
	let name = req.body.name;

	User
		.findByIdAndUpdate(_id, {$set: {name: name}}, function(err, result) {
			if(err) throw new Error(err);

			res.json({_id, name});
		});
});

app.delete("/:id", (req, res) => {
	
	let _id = req.params.id;

	User
		.findByIdAndRemove(_id, function(err, result) {
			if(err) throw new Error(err);

			res.json({status: "ok"});
		});
});