'use strict';

const Readable = require('stream').Readable;
const Writable = require('stream').Writable;
const Transform = require('stream').Transform;
const rand = require('./random.js');



class MyReadable extends Readable {
  constructor(options) {
    super(options);
  }
  _read() {
    let r = rand(0,9).toString();
    this.push(r);
  }
}

class MyWritable extends Writable {
  constructor(options) {
    super(options);
  }
  _write(chunk, encoding, callback) {
    console.log('Part 3: write =>',chunk.toString());
    callback();
  }
}


class MyTransform extends Transform {
  constructor(options) {
    super(options);
  }
  _transform (data, encoding, callback) {
    setTimeout( () => {
      let transformedData = parseInt(data.toString()) * 7;
      this.push(transformedData.toString());
      callback();
    }, 1000 * 1)
  };
}

module.exports = {MyReadable, MyWritable, MyTransform};
