var http = require("http");


class User {
  constructor(name, lastName) {
    this.name = name;
    this.lastName = lastName;
    this.secretCode = '';
  }
};

User.prototype.setSecretCode = function(hash) {
  this.secretCode = hash;
};


let user = new User (process.argv[2],process.argv[3]);
let params = JSON.stringify(user,'lastName');
let postOptions = {
  hostname: 'netology.tomilomark.ru',
  path: '/api/v1/hash',
  method: 'POST',
  headers: {
  'Content-Type': 'application/json',
  'Firstname': user.name
  },
};


var request = http.request(postOptions, function(response) {
  response.setEncoding("utf8");
  console.log("Response status code: " + response.statusCode);

  response.on("data", function(data) {
    user.setSecretCode((JSON.parse(data)).hash);
    console.log(user);
  });
});


request.end(params);