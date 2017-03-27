const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const mongoose = require('mongoose');
var routing = require("./api");


mongoose.connect('mongodb://localhost:27017/11mongoose');

// parse application/json
app.use(bodyParser.json());                        
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded());

app.use(express.static(__dirname + '/src'));

app.use(routing);

app.use(function(err, req, res, next) {
 
 	console.log(err.message);
  let [errCode, errMessage] = err.message.split("|");
  code = errCode ? errCode : 500;
  message = errMessage ? errMessage : "Please check your log file!";
 
  res.status(code).send({message});
});

app.listen(3000, () => {
  console.log("House work application run!");
});