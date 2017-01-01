const hide = require('./hidenseek');
const poklist = require('./poklist');
const PokemonList = require('./pokemonListClass.js');


let pokemonList = new PokemonList;
poklist.forEach(function (pok,i,arr) {
  pokemonList.add(pok.name,pok.level);
});

pokemonList.show();
console.log(hide('./data',pokemonList),'!!!!');
