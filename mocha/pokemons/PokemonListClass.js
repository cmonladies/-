'use strict';
const Pokemon = require('./pokemonClass.js');


class PokemonList extends Array {
  add(name, level) {
    if (arguments.length != 2)
      return;
    let newPoc = new Pokemon(name,level);
    this.push(newPoc);
  }

  show () {
    let info = {
      size: this.length,
      sizeText: `You have set of ${this.length} pokemons.`,
      poksInList :[]
    };

    console.log(`You have set of ${this.length} pokemons.`);
    this.forEach(function(item,i,arr){
      info.poksInList.push(item.show());
    });

    return info;
  }

  max () {
    let maxLevel = Math.max(...this);
    return this.find((element) => (element == maxLevel));
  }
};

module.exports = PokemonList;
