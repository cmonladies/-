angular
    .module('PokemonApp')
    .factory('BerriesService', function($resource, $http) {


        return $resource('http://pokeapi.co/api/v2/berry/:berryId/', {
            berryId: '@berryId'
        }, {
            query: {
                method: 'GET',
                isArray: true,
                transformResponse: function(responseData) {
                    return angular.fromJson(responseData).results;
                }
            }
        });
    });
