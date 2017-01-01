//const hide = require('./hidenseek');
const hide = require('./hidenseekPromise.js');
const poklist = require('./poklist');
const PokemonList = require('./pokemonListClass.js');


let pokemonList = new PokemonList;
poklist.forEach(function (pok,i,arr) {
  pokemonList.add(pok.name,pok.level);
});


console.log(hide('./data',pokemonList),'!!!!');
