const expect = require('chai').expect;
const assert = require('chai').assert;
const Pokemon = require('../pokemons/pokemonClass.js');
const PokemonList = require('../pokemons/PokemonListClass.js')

describe('Тестирование класса PokemonList:', () => {

  let pica = new Pokemon('Pikachu',99);
  let bulba = new Pokemon('Bulbasaur', 11);

  describe('Метод add() применяется к списку из двух покемонов:', () => {

    let testList;

    beforeEach(() => {
      testList = new PokemonList(pica,bulba);
    });

    it('Добавит третьего покемона. Длинна списка равна 3', () => {
      testList.add('testPoke',767);

      assert.lengthOf(testList, 3, 'array has length of 3');
    });

    it('Применяет метод без аргументов. Длинна списка равна 2', () => {
      testList.add();

      assert.lengthOf(testList, 2, 'array hasnt length of 2');
    });

    it('Проверяет, что добавленный покемон является объектом Pokemon', () => {
      testList.add('testPoke',767);

      assert.instanceOf(testList[2], Pokemon, 'item of PokemonList should be a Pokemon');
    });

  });

  describe('Метод max()', () => {

    it('Вернет значение undefined для списка без покемонов', () => {
      let testList = new PokemonList();
      let maxPok = testList.max();

      expect(maxPok).to.equal(undefined);
    });

    it('Вернет значение уровня покемона из списка из одного покемона', () => {
      let testList = new PokemonList(pica);
      let maxPok = testList.max();

      expect(maxPok.level).to.equal(99);
    });

    it('Вернет значение 99 при сравнении покемонов с уровнями 99 и 11', () => {
      let testList = new PokemonList(pica,bulba);
      let maxPok = testList.max();

      expect(maxPok.name).to.equal('Pikachu');
    });

    it('Вернет имя покемона с максимальным уровнем', () => {
      let testList = new PokemonList(bulba,pica);
      let maxPok = testList.max();

      expect(maxPok.name).to.equal('Pikachu');
    });

  });

  describe('Метод: show()', () => {

    it('Вернет информацию, содержащую длину списка', () => {
      let testList = new PokemonList(bulba,pica);
      let info = testList.show();

      expect(info.size).to.equal(2);
    });

    it('Вызовет метод show() для каждого покемона из списка', () => {
      let testList = new PokemonList(bulba,pica);
      let info = testList.show();
      let bulbaInfo = bulba.show();
      let picaInfo = pica.show();

      info.poksInList.forEach( pokesText => {
        assert.oneOf(pokesText,[bulbaInfo,picaInfo],'Not found in list');
      });
    });

  });

});
