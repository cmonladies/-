const fs = require('fs'),
      rand = require('./random.js'),
      opts = { encoding: 'utf8' },
      range = require('./range.js');
const PokemonList = require('./pokemonListClass.js');

var hiddenPokListForReturn = new PokemonList;


const getRandomListOfPoks = (pokemonList) => {

  let poksForHide = new PokemonList;
  let numberPoksForHide = rand(1,Math.min(pokemonList.length,3));

  for (let i = 0; i<numberPoksForHide; i++) {
    let j = rand(0,(pokemonList.length-1));
    poksForHide.push(pokemonList[j]);
    pokemonList.splice(j,1);
  };

  return poksForHide;
};


const getLinkFolderPokemon = poksForHide => {
  let numberOfSecretFolders = [];

  while (numberOfSecretFolders.length != poksForHide.length) {
    let num = rand(1,10)
    if (numberOfSecretFolders.indexOf(num) == -1) {
       numberOfSecretFolders.push(num);
    };
  };

  let linkFolderPokemon = [];
    poksForHide.forEach(function(pokemon,i,arr){
      linkFolderPokemon.push({pok: pokemon, folder: numberOfSecretFolders[i]});
    });

  return linkFolderPokemon;
};


const setLocalPathes = path => {
  let pathesArray = range(1,10);
  pathesArray.forEach(function(pathnumber,i,arr){
    arr[i] = path + '/0' + pathnumber;
  });
  pathesArray.push(path + '/10');
  return pathesArray;
};


const createSecretFiles = (linkFolderPokemon,path,i) => {

  //let curentFolderNumberArray = path.split("/");
  //curentFolderNumber = curentFolderNumberArray[curentFolderNumberArray.length-1];

  linkFolderPokemon.forEach(function(pokemon,n,arr) {
    //if (pokemon.folder == curentFolderNumber) {
      if (pokemon.folder == i) {
      let message = pokemon.pok.name + '|' + pokemon.pok.level;

      fs.writeFile(path +'/pokemon.txt', message, opts, err => {
        if (err) throw err;
        console.log('Файл создан!');
        hiddenPokListForReturn.push(pokemon.pok);
      });
    };
  });
};



const hide = (path,pokemonList) => {

  let poksForHide = getRandomListOfPoks(pokemonList);
  let linkFolderPokemon = getLinkFolderPokemon(poksForHide);
  let pathesArray = setLocalPathes(path);

  fs.mkdir(path, err => {
    if (err) throw err;
    console.log(`Папка ${path} создана!`);

    pathesArray.forEach(function (path,i,arr){
      fs.mkdir(path, err => {
        if (err) throw err;
        console.log(`Папка ${path} создана!`);
        createSecretFiles(linkFolderPokemon, path, i+1);
      });
    });
  });
return poksForHide;
};


module.exports = hide;