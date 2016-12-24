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

  showInfo() {
    //console.log("My name is %s. My level is %d!", this.name, this.level);
    console.log(`My name is ${this.name}. My level is ${this.level}!`);
  }
}


let pica = new Pokemon('Pikachu',99);
pica.showInfo();

class PokemonList extends Array {
  constructor(...poks) {
    this.poks = poks;
  }

  add(name, level) {
    let newPoc = new Pokemon(name,level);
    this.poks.push(newPoc);
  }
}

//PokemonList.prototype = Array;
//PokemonList.prototype = Array.prototype;
//console.log(PokemonList.prototype);


let bulba = new Pokemon('Bulbasaur', 11);
let poksList = new PokemonList(pica,bulba);
console.log(poksList);
poksList.add('Jigglypuff',11);
poksList.poks.forEach(function(item,i,arr){
  item.showInfo();
});
console.log(poksList instanceof Array);



