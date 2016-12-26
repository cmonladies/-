const fs = require('fs'),
      rand = require('./random.js');
      opts = { encoding: 'utf8' };
      range = require('./range.js');



const getRandomListOfPoks = (pokemonList) => {
  let poksForHide = [];
  let numberPoksForHide = rand(1,Math.min(pokemonList.length,3));

  for (let i = 0; i<numberPoksForHide; i++) {
    let j = rand(0,(pokemonList.length-1));
    poksForHide.push(pokemonList[j]);
    pokemonList.splice(j,1);
  };

  return poksForHide;
};


const getNumberOfSecretFolders = poksForHide => {
  let numberOfSecretFolders = [];

  while (numberOfSecretFolders.length != poksForHide.length) {
    let num = rand(1,10)
    if (numberOfSecretFolders.indexOf(num) == -1) {
       numberOfSecretFolders.push(num);
    };
  };

  console.log(numberOfSecretFolders);
  return numberOfSecretFolders;
};

const setLocalPathes = path => {
  let pathesArray = range(1,10);
  pathesArray.forEach(function(pathnumber,i,arr){
    arr[i] = path + '/0' + pathnumber;
  });
  pathesArray.push(path + '/10');
  return pathesArray;
};

const createSecretFiles = (linkFolderPokemon,numberOfSecretFolders,pokemonList,pathesArray,i) => {
  let j = i;
  if (numberOfSecretFolders.indexOf(j+1) != -1){
    linkFolderPokemon.forEach(function(pokemon,n,arr){

      if(pokemon.folder == (j+1)) {

        fs.writeFile(pathesArray[j] +'/pokemon.txt', pokemon.pok.name + '|' + pokemon.pok.level, opts, err => {
          if (err) throw err;
          console.log('Файл создан!');
          hiddenPokListForReturn.push(pokemon.pok);
          //console.log(hiddenPokListForReturn);
        });
      };
    });
  };
};

var hiddenPokListForReturn = [];

const hide = (path,pokemonList) => {
  let poksForHide = getRandomListOfPoks(pokemonList);
  console.log(poksForHide.length);
  let numberOfSecretFolders = getNumberOfSecretFolders(poksForHide);
  let pathesArray = setLocalPathes(path);

  fs.mkdir(path, err => {
  if (err) throw err;
  console.log(`Папка ${path} создана!`);

  let linkFolderPokemon = [];
  poksForHide.forEach(function(pokemon,i,arr){
    linkFolderPokemon.push({pok:pokemon,folder:numberOfSecretFolders[i]});
  });
  console.log(linkFolderPokemon);


  for (let i = 0; i < 10; i++) {
    fs.mkdir(pathesArray[i], err => {
      if (err) throw err;
      console.log(`Папка ${pathesArray[i]} создана!`);

      createSecretFiles(linkFolderPokemon, numberOfSecretFolders, pokemonList, pathesArray, i);

    });
  };

  });
return poksForHide;
};



module.exports = hide;