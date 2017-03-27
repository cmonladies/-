'use strict';

pokemonApp.component('pokemonDetail', {

    controller: function PokemonDetailCtrl(PokemonsService) {

    let vm = this;

      vm.deletePokemon = function(pokemonId) {

        vm.pokemon.$delete({
            pokemonId: pokemonId
        }, function(successResult) {
            // Окей!
            console.log('okey');
            vm.deletionSuccess = true;
        }, function(errorResult) {
            // Не окей..
            console.log('ne okey');
            vm.deletionError = true;
        });

    }

    },

    controllerAs: 'PokeDetail',

    bindings: {
        pokemon : '<'
    },


    templateUrl: './src/PokemonDetailComponent/PokemonDetailComponent.html'

});


