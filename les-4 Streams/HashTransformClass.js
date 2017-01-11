'use strict';
const Transform = require('stream').Transform;
const hash = require('crypto').createHash('md5');


class HashTransform extends Transform {
  constructor(options) {
    super(options);
  }
  _transform (data, encoding, callback) {
    let encrypted = hash.update(data).digest('hex');
    console.log('Part2:',encrypted);
    this.push(encrypted);
    callback();
  }
}


module.exports = HashTransform;