const express   = require("express");
const app       = express();
const bodyParser = require("body-parser");
let usersList = require('./users.json');


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



// ===================== RPC ========================


const RPC = {

  GET: (data, callback) => {
    console.log(`RPC => GET: /users/:id = ${data.id}`);
    let findUser = usersList.find(function (user) {
      return user.id === Number(data.id)
    });

    if(findUser)
      callback(null, findUser);
    else callback({code: 404, message: `user ${data.id} not found`});
  },


  ADD: (data, callback) => {
    console.log(`RPC => ADD: /users/`);

    let user = {
      id: data.id,
      name: data.params.name,
      score: data.params.score
    };
    usersList.push(user);

    callback(null, user)
  },


  UPDATE: (data, callback) => {
    console.log(`RPC => UPDATE: /users/:id = ${data.id}`);
    let findUser = usersList.find(function (user) {
      return user.id === Number(data.id)
    });

    if (findUser) {
      for (property in data.params) {
        if (property != 'id')
          findUser[property] = data.params[property];
      };
    callback(null, findUser);
    }
    else callback({code: 404, message: `user ${data.id} not found`});
  },


  DELETE: (data, callback) => {
    console.log(`RPC => DELETE: /users/:id = ${data.id}`);
    let findUser = usersList.find(function (user) {
      return user.id === Number(data.id)
    });

    if (findUser) {
      usersList.splice(usersList.indexOf(findUser),1);
      callback(null, 'user deleted');
    }
    else callback({code: 404, message: `user ${data.id} not found`});
  }

};






apiCRUDRPC.post("/RPC", (req, res) => {
  const method = RPC[req.body.method];
  method(req.body, function(error, result) {

    let resultRPC = {
      jsonrpc: req.body.jsonrpc,
      id: req.body.id,
      result: result
    };

    if (error) {
      resultRPC.error = error;
      resultRPC.result = null;
    }

    res.json(resultRPC);
  });
});




app.use(function(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send('Error!');
});



app.use('/apiCRUD', apiCRUD);
app.use('/apiCRUD', apiCRUDRPC);

app.listen(1335, () => {
  console.log('Server started');
});

