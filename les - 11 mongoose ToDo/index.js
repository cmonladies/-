'use strict'


const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/lesson11');
const Schema = mongoose.Schema;
const express = require("express");
const app = express();
const bodyParser = require("body-parser");



let TodoSchema = new Schema({
  name: { type: String, required: true, trim: true },
  description: String,
  status: { type: Boolean, default: false },
  dateSolution: { type: Date },
  autor: { type: String, required: true, trim: true
  }
});

let UserSchema = new Schema({
  name: { type: String, required: true, trim: true }
});



let Task =  mongoose.model('tasks', TodoSchema);
let Users =  mongoose.model('users', UserSchema);
/*
// assign a function to the "statics" object of our animalSchema
UserSchema.query.byName = function(name) {
  return this.find({ name: new RegExp(name, 'i') });
};
Users.find().byName('test').exec(function(err, result) {
  console.log(result);
});
*/



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/src'));

app.use(function(err, req, res, next) {
  let errorCode = err.message ? err.message : 500;
  console.log(errorCode);
  res.status(errorCode).send();
});


// TASKS API
app.get("/tasks", (req, res) => {

  Task.find().exec(function (err, result) {
      res.json(result);
    });
});


app.post("/tasks", (req, res) => {

  let newTask = new Task (req.body);
  newTask.save((err, result) => {
      if(err) {
        res.status(404).json({errors: ["Задача не добавлена"]});
      } else {
        res.json(result);
      }
    });
});



app.post("/tasks/find", (req, res) => {

  let searchName = '';
  let searchDescription = '';

  if (req.body.name != 'undefined')
    searchName = req.body.name;
  if (req.body.description != 'undefined')
    searchName = req.body.description;

  searchName = new RegExp(req.body.name, "i");
  searchDescription = new RegExp(req.body.description, "i");

  let filter = {
    name : searchName,
    description : searchDescription
  };

  Task.find(filter).exec(function (err, result) {
      res.json(result);
    });
});


app.put("/tasks/togglestatus/:id", (req, res) => {

  let _id = req.params.id;
  let newTask = req.body;
  newTask.dateSolution = new Date();

  Task.findByIdAndUpdate(_id, {$set: newTask}, function(err, result) {
      if(err) throw new Error(err);
      res.json({_id, newTask});
    });
});



app.put("/tasks/:id", (req, res, next) => {

  let _id = req.params.id;
  let newTask = req.body;

  Task.findByIdAndUpdate(_id, {$set: newTask}, function(err, result) {
      if(err) throw new Error(err);
      res.json({_id, newTask});
    });
});



app.delete("/tasks/:id", (req, res, next) => {

  let _id = req.params.id;

  Task.findByIdAndRemove(_id, function(err, result) {
    if(err) throw new Error(err);
    res.json({status: "ok"});
  });
});



// Users API

app.post("/users", (req, res) => {

  console.log(req.body);

  let newUser = new Users (req.body);
  newUser.save((err, result) => {
      if(err) {
        res.status(404).json({errors: ["Пользователь не добавлен "]});
      } else {
        res.json(result);
      }
    });
});



app.get("/users", (req, res, next) => {

  Users.find().exec(function (err, result) {
      res.json(result);
    });
});

app.delete("/users/:id", (req, res, next) => {

  let _id = req.params.id;

  Users.findByIdAndRemove(_id, function(err, result) {
    if(err) throw new Error(err);
    res.json({status: "ok"});
  });
});



app.put("/users/:id", (req, res, next) => {
  // Connect to the server
  let _id = req.params.id;
  let newName = req.body;

  Users.findByIdAndUpdate(_id, {$set: newName}, function(err, result) {
      if(err) throw new Error(err);
      res.json({_id, newName});
    });
});


app.get("/stat", (req, res, next) => {

  Task.aggregate({$match: {status: true}}
                ,{$project: {autor:1, count: {$add: [1]}}}
                ,{$group: {_id: "$autor", number: {$sum: "$count"}}}
                ,{$sort: {number:-1}}).exec(function (err, result) {
      res.json(result);
    });
});


app.listen(3006, () => {
  console.log("App run!");
});


