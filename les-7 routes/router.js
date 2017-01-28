'use strict';

const express   = require("express");
const router = express.Router();


router.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Error!');
});

router.get('/', function (req, res) {
  res.status(200).send('Hello Express.js');
 });

router.get('/hello', function (req, res) {
  res.status(200).send('Hello stranger !');
 });

router.get('/hello/:name', function (req, res) {
  res.status(200).send(`Hello, ${req.params.name}!`);
 });

router.all('/sub/*', function (req, res) {
  res.send(`You requested URI: ${req.hostname}${req.originalUrl}!`);
 });


const chechHeader = (req,res,next) => {
  if (req.headers.key == undefined) {
    return res.status(401).send('Sorry, Key is undefined');
  }
  next();
};

router.post('/post', chechHeader, function (req, res) {
  if(Object.keys(req.body).length == 0) {
    console.log('request body not found');
      res.status(404).send('Sorry cant find that!');
  }
  else {
    res.json(req.body);
  };
});

module.exports = router;
