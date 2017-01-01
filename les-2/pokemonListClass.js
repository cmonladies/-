'use strict';
const Pokemon = require('./pokemonClass.js');


class PokemonList extends Array {
  add(name, level) {
    let newPoc = new Pokemon(name,level);
    this.push(newPoc);
  }
};

PokemonList.prototype.show = function() {
  console.log(`You have set of ${this.length} pokemons.`);
  this.forEach(function(item,i,arr){
    item.show();
  });
};


PokemonList.prototype.max = function() {
  let maxLevel = Math.max(...this);
  return this.find((element) => (element == maxLevel));
};



module.exports = PokemonList;
