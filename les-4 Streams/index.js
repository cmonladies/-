const fs = require('fs');
const crypto = require('crypto');
const hash = crypto.createHash('md5');
hash.setEncoding('hex');
const input = fs.createReadStream('text');
const out = fs.createWriteStream('out');


hash.on('data', function(chunk) {
  console.log('HeX:', chunk);
});
input.pipe(hash).pipe(out);
//Или так:
//input.pipe(hash).pipe(process.stdout);
//hash.pipe(out);

