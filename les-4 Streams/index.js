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

//input.pipe(hash); //Если только так, в консоль пишет
//input.pipe(hash).pipe(out); //Если так - только в файл. Вопрос!
input.pipe(hash).pipe(process.stdout);
hash.pipe(out);
//Вопрос! Почему при цепочке стримов input -> hash -> out не срабатывает hash.on('readable' .... ?