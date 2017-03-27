//const hide = require('./hidenseek');
const hide = require('./hidenseekPromise.js').hide;
const poklist = require('./poklist');
const PokemonList = require('./pokemonListClass.js');
const seek = require('./hidenseekPromise.js').seek;



let pokemonList = new PokemonList;
poklist.forEach(function (pok,i,arr) {
  pokemonList.add(pok.name,pok.level);
});

let pokemonListHiddenMain = new PokemonList;
/*
var a = hide('./field',pokemonList, function(hiddenPokListForReturn){
  console.log('main:',hiddenPokListForReturn);
  return pokemonListHiddenMain;
});
*/

//console.log(hide('./field',pokemonList));

seek('./field');