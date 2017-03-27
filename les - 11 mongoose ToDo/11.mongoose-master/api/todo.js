const express = require("express");
let app = module.exports = express();

let search = require("./filter").search;
let parseData = require("./filter").parseData;

let Todo = require("./Todo.schema");

app.get("/", search, (req, res) => {

	let pageNumber = req.mongoParams.pageNumber > 0 ? ((req.mongoParams.pageNumber-1)*req.mongoParams.nPerPage) : 0;
	let nPerPage = req.mongoParams.nPerPage;
	
	let cursor = Todo
		.aggregate([
			{
				$match: req.mongoParams.query
			},
			{
				$lookup: {
					from: "users",
					localField: "userId",
					foreignField: "_id",
					as: "user"
				}
			},
			{
				$unwind: {
					path: "$user",
					preserveNullAndEmptyArrays: true
				}
			},
			{
				$sort: {
					closeDate: req.mongoParams.sort
				}
			}
		])
        .cursor({batchSize: 1000})
        .exec();

	if(pageNumber > -1 && nPerPage) {
		cursor.skip(pageNumber).limit(nPerPage);
	}

	cursor.toArray(function (err, items) {
		if(err) throw new Error(err);

		Todo.count(req.mongoParams.query, function(err, count) {
			res.json({items, count});
		});
	});
});

app.post("/", parseData, (req, res) => {

	let todo = new Todo(req.body);

	todo
		.save((err, result) => {
			if(err) {
				res.status(404).json({errors: ["Невозможно найти задачу"]});
			} else {
				res.json(result);
			}
		});
});

app.put("/:id", parseData, (req, res) => {

	let _id = req.params.id;
	let params = req.body;
	let errors = [];

	Todo
		.findById(_id, function(err, foundObject) {
			if(err) throw new Error(err);

			if(!foundObject.status && !params.status) errors.push("Невозможно изменить закрытую задачу!");
			if(params.status) params.closeDate = null;
			if((!foundObject.closeDate || foundObject.closeDate === null) && !params.status) params.closeDate = new Date();

			if(errors.length > 0) {
				res.status(400).json({errors});
			} else {
				Todo.updateOne({_id: _id}, {$set: params}, function(err, updatedObject) {
					if(err) throw new Error(err);

					res.json(params);
				});
			}
		});
});

app.delete("/:id", (req, res) => {
	
	let _id = req.params.id;

	Todo
		.findByIdAndRemove(_id, function(err, result) {
			if(err) {
				res.status(404).json({errors: ["Невозможно найти задачу"]});
			} else {
				res.json({status: "ok"});
			}
		});
});

app.get("/stat", (req, res) => {
	console.log("daksdkas");
	Todo
		.aggregate([
			{
				$match: { status: false }
			},
			{
				$group: {
					_id: "$userId",
					count: { $sum: 1 }
				}
			},
			{
				$lookup: {
					from: "users",
					localField: "_id",
					foreignField: "_id",
					as: "user"
				}
			},
			{
				$unwind: {
					path: "$user",
					preserveNullAndEmptyArrays: true
				}
			}
		])
        .exec(function (err, items) {
			if(err) throw new Error(err);

			res.json(items);
		});
});

app.get("/:id", (req, res) => {

	Todo
		.findOne({_id: req.params.id}).exec(function (err, result) {
			if(err) {
				res.status(404).json({errors: ["Невозможно найти задачу"]});
			} else {
				res.json(result);
			}
		});
});
