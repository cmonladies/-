const expect = require('chai').expect;
const assert = require('chai').assert;
const Pokemon = require('../pokemons/pokemonClass.js');
const PokemonList = require('../pokemons/PokemonListClass.js')

describe('pokemonList class tests', () => {

  let pica = new Pokemon('Pikachu',99);
  let bulba = new Pokemon('Bulbasaur', 11);

  describe('method: add', () => {

    let testList;

    beforeEach(() => {
      testList = new PokemonList(pica,bulba);
    });

    it('two args', () => {
      testList.add('testPoke',767);
      assert.lengthOf(testList, 3, 'array has length of 3');
    });

    it('zero args', () => {
      testList.add();
      assert.lengthOf(testList, 2, 'array hasnt length of 2');
    });

    it('check Pokemon class', () => {
      testList.add('testPoke',767);
      assert.typeOf(testList[2], 'object', 'item of PokemonList is Pokemon');
    });

  });

  describe('method: max', () => {
    let pica = new Pokemon('Pikachu',99);
    let bulba = new Pokemon('Bulbasaur', 11);

    it('Пустой список', () => {
      let testList = new PokemonList();
      let maxPok = testList.max();
      expect(maxPok).to.equal(undefined);
    });

    it('В списке один покемон', () => {
      let testList = new PokemonList(pica);
      let maxPok = testList.max();
      expect(maxPok.level).to.equal(99);
    });

    it('Первый покемон в списке больше второго', () => {
      let testList = new PokemonList(pica,bulba);
      let maxPok = testList.max();
      expect(maxPok.name).to.equal('Pikachu');
    });

    it('Второй покемон в списке больше первого', () => {
      let testList = new PokemonList(bulba,pica);
      let maxPok = testList.max();
      expect(maxPok.name).to.equal('Pikachu');
    });

  });

  describe('method: show', () => {

    it('Сравниваем размер списка и параметр size, возвращаемый методом', () => {
      let testList = new PokemonList(bulba,pica);
      let info = testList.show();
      expect(info.size).to.equal(2);
    });

    it('Проверяем корректное представление информации о двух покемонах в списке', () => {
      let testList = new PokemonList(bulba,pica);
      let info = testList.show();
      info.poksInList.forEach( pokesText => {
        assert.oneOf(pokesText,[bulba.show(),pica.show()],'Not found in list');
      });
    });

  });

});
