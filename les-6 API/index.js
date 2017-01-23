const express   = require("express");
const app       = express();
const bodyParser = require("body-parser");
let users = require('./users.json');

let indexUser = 0;
class User {
  constructor(name, score) {
    this.name = name;
    this.score = score;
    indexUser++;
    this.id = indexUser;
  }
};

let usersList = [];
users.forEach(function (user,i,arr) {
  usersList.push(new User(user.name, user.score));
});



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({"extended": true}));


const apiCRUD = express.Router();
const apiCRUDRPC = express.Router();


apiCRUD.get('/users', function(req, res) {
  console.log('GET: /users');
  res.send(usersList);
});


apiCRUD.post("/users/", function(req, res) {
  console.log('POST: /users');
  let user = new User (req.body.name, req.body.score);
  usersList.push(user);
  console.log(usersList);
  res.send(user);
});


apiCRUD.get('/users/:id', function(req, res) {
  console.log('GET: /users/:id');
  let findUser = usersList.find(function (user) {
    return user.id === Number(req.params.id)
  });
  res.send(findUser);
});


apiCRUD.put('/users/:id', function (req, res){
  console.log('PUT: /users/:id');
  let findUser = usersList.find(function (user) {
    return user.id === Number(req.params.id)
  });

  for (property in req.body) {
      findUser[property] = req.body[property];
  };
  res.send(findUser);
});


apiCRUD.delete('/users/:id', function (req, res){
  console.log('DELTE: /users/:id');
  let findUser = usersList.find(function (user) {
    return user.id === Number(req.params.id)
  });

  usersList.splice(usersList.indexOf(findUser),1);
  res.send(usersList);
});



// ===================== RPC ========================



app.use('/apiCRUD', apiCRUD);
app.use('/apiCRUD/RPC', apiCRUDRPC);

app.listen(1335);
