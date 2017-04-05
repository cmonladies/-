'use strict';

class Pokemon {
  constructor(name, level) {
    this.name = name;
    this.level = level;
  }
  show () {
  console.log(`My name is ${this.name}. My level is ${this.level}!`);
  return `My name is ${this.name}. My level is ${this.level}!`;
  }
}

Pokemon.prototype.valueOf = function() { return this.level; };

module.exports = Pokemon;