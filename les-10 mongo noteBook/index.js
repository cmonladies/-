'use strict'

const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const ObjectID = mongodb.ObjectID;
const url = 'mongodb://localhost:27017/lesson9';
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/src'));

app.use(function(err, req, res, next) {
  let errorCode = err.message ? err.message : 500;
  console.log(errorCode);
  res.status(errorCode).send();
});

app.get("/users", (req, res, next) => {

  MongoClient.connect(url, function (err, db) {
    if (err) {
      console.log('Unable to connect to the Server', err);
    } else {
        // We are connected
        console.log('Connection established to', url);
        let collection = db.collection('users');

        collection.find().toArray(function (err, result) {
          res.json(result);
          db.close();
          console.log('connection closed');
        });
      }
    });
});



app.post("/users", (req, res, next) => {

  // Connect to the server
  MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the Server', err);
  } else {
      // We are connected
      console.log('Connection established to', url);
      let collection = db.collection('users');

      let newUser = req.body;
      collection.insertOne(newUser, (err, result) => {
        if(err) throw new Error(err);
        res.json(newUser);
        db.close();
        console.log('connection closed');
      });
    };
  });
});


app.put("/users/:id", (req, res, next) => {
  // Connect to the server
  MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the Server', err);
  } else {
      // We are connected
      console.log('Connection established to', url);

      let collection = db.collection('users');
      let _id = req.params.id;
      let updatingUser = req.body;

      collection.updateOne({_id: ObjectID(_id)}, {$set: updatingUser}, function(err, result) {
        if(err) throw new Error(err);
        res.json({_id, updatingUser});
      });
    }
  });
});


app.delete("/users/:id", (req, res, next) => {
  // Connect to the server
  MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the Server', err);
  } else {
      // We are connected
      console.log('Connection established to', url);

      let collection = db.collection('users');
      let user = req.params;
      let usersId = ObjectID(user.id);

      collection.deleteOne({_id: usersId }, (err, result) => {
      if(err) throw new Error(err);
      res.json({status: "ok"});
    });
    }
  });
});

app.post("/users/find", (req, res, next) => {

  // Connect to the server
  MongoClient.connect(url, function (err, db) {
  if (err) {
    console.log('Unable to connect to the Server', err);
  } else {
      // We are connected
      console.log('Connection established to', url);
      let collection = db.collection('users');


      let query = req.body;
      console.log(query);

      collection.find(query).toArray(function (err, result) {
          res.json(result);
          db.close();
          console.log('connection closed');
        });
    };
  });
});



app.listen(3003, () => {
  console.log("App run!");
});


