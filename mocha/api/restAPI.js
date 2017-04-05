const express   = require("express");
const app       = express();
const bodyParser = require("body-parser");
let usersList = require('./users.json');

console.log(usersList);


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended": true}));


const apiCRUD = express.Router();
//const apiCRUDRPC = express.Router();


apiCRUD.get('/users', function(req, res) {
  console.log('GET: /users');
  res.send(usersList);
});


apiCRUD.post("/users/", function(req, res) {
  console.log('POST: /users');
  let user = {
    id: usersList.length +1,
    name: req.body.name,
    score: req.body.score
  };
  usersList.push(user);
  res.send(user);
});


apiCRUD.get('/users/:id', function(req, res) {
  console.log(`GET: /users/:id = ${req.params.id}`);
  let findUser = usersList.find(function (user) {
    return user.id === Number(req.params.id)
  });
  res.send(findUser);
});


apiCRUD.put('/users/:id', function (req, res){
  console.log(`PUT: /users/:id = ${req.params.id}`);
  let findUser = usersList.find(function (user) {
    return user.id === Number(req.params.id)
  });

  for (property in req.body) {
      findUser[property] = req.body[property];
  };
  res.send(findUser);
});


apiCRUD.delete('/users/:id', function (req, res){
  console.log(`DELTE: /users/:id = ${req.params.id}`);
  let findUser = usersList.find(function (user) {
    return user.id === Number(req.params.id)
  });

  usersList.splice(usersList.indexOf(findUser),1);
  res.send(usersList);
});



app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Error!');
});



app.use('/apiCRUD', apiCRUD);
//app.use('/apiCRUD/RPC', apiCRUDRPC);

app.listen(1335, () => {
  console.log('Server started');
});

