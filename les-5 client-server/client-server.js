const http = require('http');
const fs = require('fs');
const url = require('url');
const querystring = require('querystring');


http.createServer(function(req, res) {
  let urlParsed = url.parse(req.url);

  switch (urlParsed.pathname) {

    case '/':
      sendFile("index.html", res);
      break;

    case '/result':
      let body = '';
      let user = {
          name: '',
          lastName: '',
          secretCode:'',
          setSecretCode : function (hash) {
            this.secretCode = hash;
          }
        };

        req.on('readable', function() {
          let cont = req.read();
          if (cont) {
             body += cont;
          }

          if (body.length > 1e4) {
            res.statusCode = 413;
            res.end("Message is too big");
          }
        });

        req.on('end', function() {

            body = querystring.parse(body);
            user.name = body.first_name;
            user.lastName = body.last_name;

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

            let request = http.request(postOptions, function(response) {
              response.setEncoding("utf8");
              console.log("Response status code: " + response.statusCode);

              response.on("data", function(data) {
                user.setSecretCode((JSON.parse(data)).hash);
                res.end(JSON.stringify(user));
              });
            });

            request.end(params);
        });

    default:

      res.statusCode = 404;
  }


}).listen(3000);

function sendFile(fileName, res) {
  var fileStream = fs.createReadStream(fileName);
  fileStream
    .on('error', function() {
      res.statusCode = 500;
      res.end("Server error");
    })
    .pipe(res)
    .on('close', function() {
      fileStream.destroy();
    });
}
