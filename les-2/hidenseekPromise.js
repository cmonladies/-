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


var createSecretFilesPromise = function (pathesArray,linkFolderPokemon,path) {

  return new Promise((resolve, reject) => {
    pathesArray.forEach(function (path,i,arr){
      fs.mkdir(path, err => {
        if(err) return reject(err);
        console.log(`Папка ${path} создана!`);

        linkFolderPokemon.forEach(function(pokemon) {
          if (pokemon.folder == i+1) {
            let message = pokemon.pok.name + '|' + pokemon.pok.level;
            fs.writeFile(path +'/pokemon.txt', message, opts, err => {
              if(err) return reject(err);
              console.log('Файл создан!');
              hiddenPokListForReturn.push(pokemon.pok);
              resolve();
            });
          };
        });

      });
    });
  });
};

var createHeadFolderPromise = function (path) {
  return new Promise((resolve, reject) => {
    fs.mkdir(path, err => {
    if (err) return reject(err);
    console.log(`Папка ${path} создана!`);
    resolve();
    });
  });
};


const hide = (path,pokemonList) => {

  let poksForHide = getRandomListOfPoks(pokemonList);
  let linkFolderPokemon = getLinkFolderPokemon(poksForHide);
  let pathesArray = setLocalPathes(path);

  createHeadFolderPromise(path)
  .then(() => createSecretFilesPromise(pathesArray,linkFolderPokemon, path))
  .then(() => {console.log(hiddenPokListForReturn)})
  .then(() => {return hiddenPokListForReturn})
  .catch( err => console.log(err));
};



const seek = (path) => {
  let conf = { encoding: 'utf8' };
  let pokList = new PokemonList;
  fs.readdir(path, (err,files) => {
    if (err) throw err;
    files.forEach(function(localPath,i,arr) {
      fs.readdir(path + '/' + localPath, (err,files) => {
        if (err) throw err;
        if (files.length > 0) {
          fs.readFile(path + '/' + localPath + '/' + files[0], conf, (err, data) => {
          if (err) throw err;
          let pokemon = data.split('|');
          pokList.add(pokemon[0],pokemon[1]);
          console.log(pokList);
          });
        };
      });
    });
  });
};




module.exports = {hide, seek};