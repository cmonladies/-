const expect = require('chai').expect;
const assert = require('chai').assert;
const Pokemon = require('../pokemons/pokemonClass.js');
const PokemonList = require('../pokemons/PokemonListClass.js')


describe('Pokemon class tests:', () => {

  describe('Method: show()', () => {

    var tests = [
    {poke: new Pokemon(), expected: "My name is undefined. My level is undefined!"},
    {poke: new Pokemon('test1'), expected: "My name is test1. My level is undefined!"},
    {poke: new Pokemon('test2',77), expected: "My name is test2. My level is 77!"}];

    //{poke: new Pokemon('test1','seven'), expected: "My name is test1. My level is seven!"}
    tests.forEach((pokemon,number) => {
      it(`Тестируем метод для экземпляра класса Pokemon созданного при ${number} аргементах` , () => {
          let showText = pokemon.poke.show();
          expect(showText).to.equal(pokemon.expected);
      });
    });

    it('Передача строки в качестве аргумента level', () => {
      let testPokemon = new Pokemon ('testPoke', 'seven');
      expect(testPokemon.show(),'Ошибочное значение').to.equal("My name is testPoke. My level is seven!");
    });
  });
});

