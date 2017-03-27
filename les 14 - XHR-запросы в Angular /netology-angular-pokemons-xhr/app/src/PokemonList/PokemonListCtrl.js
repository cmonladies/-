'use strict';

pokemonApp.controller('PokemonListCtrl', function($scope, $q, PokemonsService, BerriesService) {

    // PokemonsService.getPokemons().then(function(response) {
    //     $scope.pokemons = response.data.results;
    // });
    //
    // BerriesService.getBerries().then(function(response) {
    //     $scope.berries = response.data.results;
    // });
    $scope.pokemonsLoaded = false;
    $scope.berriesLoaded = false;
    $scope.pokesAndBerries = false;
/*
    PokemonsService.getPokemons().then(function(response) {
        $scope.pokemons = response.data.results;
        $scope.pokemonsLoaded = true;

        return BerriesService.getBerries()
    }).then(function(response) {
        $scope.berries = response.data.results;
        $scope.berriesLoaded = true;
    });

*/

$q.all({
        getPokes: PokemonsService.getPokemons(),
        getBerries: BerriesService.getBerries()
    }).then(function(values){
        $scope.pokemons = values.getPokes.data.results;
        $scope.berries = values.getBerries.data.results;
        $scope.pokesAndBerries = true;
    });


});
