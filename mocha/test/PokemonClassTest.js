const expect = require('chai').expect;
const assert = require('chai').assert;
const Pokemon = require('../pokemons/pokemonClass.js');
const PokemonList = require('../pokemons/PokemonListClass.js')


describe('Тестирование класса Pokemon:', () => {

  describe('Method: show()', () => {

    var tests = [
    {poke: new Pokemon(), expected: "My name is undefined. My level is undefined!"},
    {poke: new Pokemon('test1'), expected: "My name is test1. My level is undefined!"},
    {poke: new Pokemon('test2',77), expected: "My name is test2. My level is 77!"}];


    tests.forEach((pokemon,number) => {
      it(`Вернет информацию о покемоне, созаднном при ${number} аргументах` , () => {
          let showText = pokemon.poke.show();

          expect(showText).to.equal(pokemon.expected);
      });
    });

    it('Вернет текстовое значение уровня покемона в строке информации', () => {
      let testPokemon = new Pokemon ('testPoke', 'seven');
      let showText = testPokemon.show();

      expect(showText,'Ошибочное значение').to.equal("My name is testPoke. My level is seven!");
    });
  });
});

