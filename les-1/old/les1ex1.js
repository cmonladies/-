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

function Pokemon(name,level) {
  this.name = name;
  this.level = level;

  this.showInfo = function() {
    console.log(`My name is ${this.name}. My level is ${this.level}!`);
  }
}

let pica = new Pokemon('Pikachu',99);

function PokemonList(...poks) {
  this.poks = poks;
}

//!!!
//!!!
//Вопрос: при PokemonList.prototype = Array; console.log(poksList instanceof Array) возвращает false
PokemonList.prototype = Array.prototype;
//PokemonList.prototype = Array;
//console.log(PokemonList.prototype);
PokemonList.prototype.add = function(name, level) {
  let newPoc = new Pokemon(name,level);
  this.poks.push(newPoc);
};
//console.log(PokemonList.prototype);


let bulba = new Pokemon('Bulbasaur', 11);
let poksList = new PokemonList(pica,bulba);
poksList.add('Jigglypuff',11);
console.log(poksList instanceof Array);


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
let lost = new PokemonList(pica,bulba);
lost.add('Jigglypuff',301);
let andrey = new Pokemon('andrey',999),
  vasya = new Pokemon('vasya',77);
let found = new PokemonList(andrey,vasya);
found.add('petr',55);


PokemonList.prototype.show = function() {

  console.log(`You have set of ${this.poks.length} pokemons.`);
  this.poks.forEach(function(item,i,arr){
    item.showInfo();
  });

  let max = this.poks[0].level;
  let imax = 0; //Номер максимального покемона в массиве
  for (let i = 0; i < this.poks.length; ++i) {
    if (this.poks[i].level > max)
    {
      max = this.poks[i].level;
      imax = i;
    }
  }
  console.log(`Max level of this Set is ${max} - ${this.poks[imax].name}.`);
};
found.show();


Pokemon.prototype.valueOf = function() { return this.level; };
PokemonList.prototype.showValueOf = function() {
  let max = (+this.poks[0]);
  let imax = 0; //Номер максимального покемона в массиве
  for (let i = 0; i < this.poks.length; ++i) {
    if (+this.poks[i] > max)
    {
      max = +this.poks[i];
      imax = i;
    }
  }
  console.log(`Max level of this Set is ${max} - ${this.poks[imax].name}.`);
};
lost.showValueOf();



PokemonList.prototype.movePokemon = function(name,newSet) {
  //Тут возможно можно проще
  let findFlag = false;

  for (let i = 0; i < this.poks.length; ++i) {
    if (this.poks[i].name == name) {
      newSet.add(name,+this.poks[i]);
      this.poks.splice(i,1);
      findFlag = true;
      console.log(`Покемон ${name} перемещен`);
      break;
    }
  }
  if (!findFlag) console.log(`Покемона ${name} нет в наборе`);
}
console.log(lost.poks.length);
console.log(found.poks.length);
found.movePokemon('petr',lost);
console.log(lost.poks.length);
console.log(found.poks.length);

