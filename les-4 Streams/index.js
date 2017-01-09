const fs = require('fs');
const crypto = require('crypto');
const hash = crypto.createHash('md5');
hash.setEncoding('hex');
const input = fs.createReadStream('text');
const out = fs.createWriteStream('out');

hash.on('readable', () => {
  var data = hash.read();
  if (data)
    console.log(data.toString('hex'));
});

//hash.setMaxListeners(8);

input.pipe(hash); //Если только так, в консоль пишет
input.pipe(hash).pipe(out); //Если так - только в файл. Вопрос!