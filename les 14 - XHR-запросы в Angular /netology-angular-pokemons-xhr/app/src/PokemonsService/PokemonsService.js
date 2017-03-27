angular
    .module('PokemonApp')
    .factory('PokemonsService', function($http) {


        $http.defaults.headers.post['application-id'] = "6767566F-8DD1-0F30-FF04-E24059D6FF00";
        $http.defaults.headers.post['secret-key'] = "2F630E52-1FDB-EEC0-FF6E-9B4E64DFEB00";
        $http.defaults.headers.delete = {'application-id' :'6767566F-8DD1-0F30-FF04-E24059D6FF00'
                                        ,'secret-key' : '2F630E52-1FDB-EEC0-FF6E-9B4E64DFEB00'};
        $http.defaults.headers.put = {'application-id' :'6767566F-8DD1-0F30-FF04-E24059D6FF00'
                                        ,'secret-key' : '2F630E52-1FDB-EEC0-FF6E-9B4E64DFEB00'};


            return {

                getMyPokemons: function() {
                    return $http({
                        method: 'GET',
                        url: 'https://api.backendless.com/v1/data/pokemons',
                        headers: {
                            'application-id': "6767566F-8DD1-0F30-FF04-E24059D6FF00",
                            'secret-key': '2F630E52-1FDB-EEC0-FF6E-9B4E64DFEB00'
                        }
                    });

                },

                editPokemon: function (pokemon) {
                    return $http({
                        method: 'PUT',
                        url: "https://api.backendless.com/v1/data/pokemons/" + pokemon.id,
                        data: pokemon
                    });

                },

                getPokemons: function() {
                    return $http.get('http://pokeapi.co/api/v2/pokemon/?limit=10');
                },

                getPokemon: function(pokemonId) {
                    return $http.get('http://pokeapi.co/api/v2/pokemon/' + pokemonId);
                },

                createPokemon: function(pokemonData) {
                    return $http({
                        method: 'POST',
                        url: 'https://api.backendless.com/v1/data/pokemons',
                        data: pokemonData
                    });
                },

                deletePokemon: function(pokemonId) {
                    return $http({
                        method: 'DELETE',
                        url: 'https://api.backendless.com/v1/data/pokemons/' + pokemonId
                    });
                }

            }

        }

    );
