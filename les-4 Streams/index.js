'use strict';

const fs = require('fs');
const hash = require('crypto').createHash('md5').setEncoding('hex');
const input = fs.createReadStream('text');
const out = fs.createWriteStream('outPart1');

//part 1
/***********************************************/

hash.on('data', function(chunk) {
  console.log('Part1, HeX:', chunk);
});
input.pipe(hash).pipe(out);
//Или так:
//input.pipe(hash).pipe(process.stdout);
//hash.pipe(out);


//part2
/***********************************************/

const HashTransform = require('./HashTransformClass.js');
const out2 = fs.createWriteStream('outPart2');

var hashTransform = new HashTransform;

input.pipe(hashTransform).pipe(out2);