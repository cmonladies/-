'use strict';

pokemonApp.controller('EditPokemon', function($scope, PokemonsService) {

    $scope.pokesListLoad = false;
    $scope.pokemonForEdit = {};
    $scope.editSuccess = false;

    PokemonsService.getMyPokemons().then(function(response) {
        $scope.pokemons = response.data.data;
        $scope.pokesListLoad = true;
     });

    $scope.beginEditing = (pokemon) => {
        $scope.pokemonForEdit = {
            id: pokemon.objectId,
            name: pokemon.name,
            weight: pokemon.weight
        }
    },

    $scope.editPokemon = (pokemon) => {
        PokemonsService.editPokemon(pokemon).then(function(response) {
            $scope.editPokemonId = response.data.id;
            $scope.pokemonForEdit = {};
            $scope.editSuccess = true;
            $scope.pokesListLoad = false;
            return PokemonsService.getMyPokemons();
     }).then(function(response) {
        $scope.pokemons = response.data.data;
        $scope.pokesListLoad = true;
     });
    };
});
