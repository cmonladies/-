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
Pokemon.prototype.showInfo = function() {
  console.log(`My name is ${this.name}. My level is ${this.level}!`);
};

class PokemonList extends Array {
/*
  constructor(...poks) {
    this.poks = poks;
  }
*/
  add(name, level) {
    let newPoc = new Pokemon(name,level);
    this.push(newPoc);
  }
}

let pica = new Pokemon('Pikachu',99);
let bulba = new Pokemon('Bulbasaur', 11);
let poksList = new PokemonList(pica,bulba);
//console.log(poksList);

poksList.add('Jigglypuff',11);
poksList.forEach(function(item,i,arr){
  item.showInfo();
});

//console.log(poksList instanceof Array);


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
    vasya = new Pokemon('vasya',77);
let found = new PokemonList(andrey,vasya),
    lost = new PokemonList(pica,bulba);
found.add('petr',301);
lost.add('Jigglypuff',301);


PokemonList.prototype.show = function() {
  console.log(`You have set of ${this.length} pokemons.`);
  this.forEach(function(item,i,arr){
    item.showInfo();
  });
};
found.show();


PokemonList.prototype.movePokemon = function(name,newSet) {
  let findFlag = false;

  this.forEach(function(pokemon,i,arr){
    if (pokemon.name == name) {
      newSet.push(pokemon);
      //newSet.add(name,+pokemon);
      arr.splice(i,1);
      findFlag = true;
      console.log(`Покемон ${name} перемещен`);
    };
  });
  if (!findFlag) console.log(`Покемона ${name} нет в наборе`);
};

//console.log(lost.length);
//console.log(found.length);
found.movePokemon('petr',lost);
//console.log(lost.length);
//console.log(found.length);


Pokemon.prototype.valueOf = function() { return this.level; };
PokemonList.prototype.showMaxLevel = function() {
  let maxLevel = Math.max.apply(null,this);
  let poksWithMaxLevel = this.filter(function(element) {
    return element == maxLevel;
  });

  console.log(poksWithMaxLevel);
  console.log(`Max level of this Set is ${maxLevel} \n Pokemons with max level:`);
  poksWithMaxLevel.forEach(function(pokemon,i,arr){
    console.log(pokemon.name);
  });
};
lost.showMaxLevel();


