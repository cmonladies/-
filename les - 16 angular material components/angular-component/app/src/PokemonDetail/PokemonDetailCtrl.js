'use strict';

pokemonApp.controller('PokemonDetailCtrl', function($scope, $routeParams, PokemonsService) {

    $scope.pokemonLoaded = false;

    $scope.pokemon = PokemonsService.get({
        pokemonId: $routeParams['pokemonId']
    }, function(successResult) {
        // Окей!
        $scope.notfoundError = false;
        $scope.pokemonLoaded = true;


    }, function(errorResult) {
        // Не окей..
        console.log('errorResult');
        $scope.notfoundError = true;
        $scope.pokemonLoaded = true;
        $scope.activeTab = 1;
        $scope.disableControlTab = true;

    });

    $scope.pokemon.$promise.then(function(result) {
        //$scope.pokemonLoaded = true;
    });


});
