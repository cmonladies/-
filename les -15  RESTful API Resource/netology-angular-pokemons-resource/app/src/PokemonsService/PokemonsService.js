angular
    .module('PokemonApp')
    .factory('PokemonsService', function($resource, $http) {

        let headers = {
                    "application-id": "4B730C92-F81E-236B-FFF0-6651FE882800",
                    "secret-key": "CB6DE86C-6069-86C4-FF1C-9049D5AC9400"
        };

        return $resource('https://api.backendless.com/v1/data/pokemon/:pokemonId/', {
            pokemonId: '@pokemonId'
        }, {
            get: {
                headers: headers
            },
            delete: {
                method: 'DELETE',
                headers: headers
            },
            query: {
                method: 'GET',
                isArray: true,
                headers: headers,
                transformResponse: function(responseData) {
                    return angular.fromJson(responseData).data;
                }
            },
            update: {
                method: 'PUT',
                headers: headers
            },
            save: {
                method: 'PUT',
                headers: headers
            }
        });
    });
