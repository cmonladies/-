/*

Часть 1:
— Создать класс Pokemon , конструктор которого принимает имя и
уровень в качестве аргумента. Все экземпляры этого класса должны иметь
общий метод show , который выводит информацию о покемоне.

— Создать класс PokemonList , который в качестве аргументов
принимает любое количество покемонов. Экземпляры этого класса
должны обладать всеми функциями массива. А так же иметь метод add ,
который принимает в качестве аргументов имя и уровень, создает нового
покемона и добавляет его в список.

*/
'use strict';

class Pokemon {
  constructor(name, level) {
    this.name = name;
    this.level = level;
  }
}
Pokemon.prototype.show = function() {
  console.log(`My name is ${this.name}. My level is ${this.level}!`);
};

class PokemonList extends Array {
  add(name, level) {
    let newPoc = new Pokemon(name,level);
    this.push(newPoc);
  }
}


let pica = new Pokemon('Pikachu',99);
let bulba = new Pokemon('Bulbasaur', 11);
let poksList = new PokemonList(pica,bulba);

poksList.add('Jigglypuff',11);
poksList.forEach(function(item,i,arr){
  item.show();
});




/*
Часть 2:
— Создать два списка покемонов и сохранить их в переменных lost и
found . Имена и уровни придумайте самостоятельно.

— Добавить несколько новых покемонов в каждый список.

— Добавить спискам покемонов метод show , который выводит
информацию о покемонах и их общее количество в списке.

— Перевести одного из покемонов из списка lost в список found

Для зачета с отличием:
— Добавить спискам покемонов метод max , который возвращает
покемона максимального уровня.
— Переопределите и используйте метод valueOf у покемонов, для
решения этой задачи.
*/
console.log('Часть 2');


let andrey = new Pokemon('andrey',999),
    vasya = new Pokemon('vasya',7777);
let found = new PokemonList(andrey,vasya),
    lost = new PokemonList(pica,bulba);
found.add('petr',30221);
lost.add('Jigglypuff',3021);


PokemonList.prototype.show = function() {
  console.log(`You have set of ${this.length} pokemons.`);
  this.forEach(function(item,i,arr){
    item.show();
  });
};
found.show();


PokemonList.prototype.movePokemon = function(name,newSet) {
  let findFlag = false;
  let pokemonForMoveing = this.find((elem,i,arr) => (elem.name == name));

  if (typeof pokemonForMoveing != 'undefined') {
    newSet.push(pokemonForMoveing);
    this.splice(this.indexOf(pokemonForMoveing),1);
    console.log(`Покемон ${name} перемещен`);
  }
  else console.log(`Покемона ${name} нет в наборе`);
};

found.movePokemon('petr',lost);


Pokemon.prototype.valueOf = function() { return this.level; };
PokemonList.prototype.max = function() {
  let maxLevel = Math.max(...this);
  return this.find((element) => (element == maxLevel));
};
console.log(lost.max());

