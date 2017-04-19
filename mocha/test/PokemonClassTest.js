const expect = require('chai').expect;
const assert = require('chai').assert;
const Pokemon = require('../pokemons/pokemonClass.js');
const PokemonList = require('../pokemons/PokemonListClass.js')



describe('Pokemon class tests:', () => {

  describe('Method: show()', () => {

    var tests = [
    {poke: new Pokemon('test2',77), expected: "My name is test2. My level is 77!"},
    {poke: new Pokemon(), expected: "My name is undefined. My level is undefined!"},
    {poke: new Pokemon('testPoke','seven'), expected: "My name is testPoke. My level is seven!"}];

      it(`Тестируем метод для экземпляра класса Pokemon созданного при передаче в конструктор значений test2 и 77, вернет:My name is test2. My level is 77!` , () => {
          let showText = tests[0].poke.show();
          expect(showText).to.equal(tests[0].expected);
      });

      it(`Тестируем метод для экземпляра класса Pokemon созданного без параметров name и level, вернет: My name is undefined. My level is undefined!` , () => {
          let showText = tests[1].poke.show();
          expect(showText).to.equal(tests[1].expected);
      });

      it('Создаем покемона с параметрами name = testPoke и level = "seven", метод должен вернуть строку: My name is testPoke. My level is seven!', () => {
          let showText = tests[2].poke.show();
        expect(showText,'Ошибочное значение').to.equal(tests[2].expected);
    });
  });
});

