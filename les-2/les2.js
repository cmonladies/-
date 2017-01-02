//const hide = require('./hidenseek');
const hide = require('./hidenseekPromise.js').hide;
const poklist = require('./poklist');
const PokemonList = require('./pokemonListClass.js');
const seek = require('./hidenseekPromise.js').seek;



let pokemonList = new PokemonList;
poklist.forEach(function (pok,i,arr) {
  pokemonList.add(pok.name,pok.level);
});





hide('./field',pokemonList);
seek('./field');