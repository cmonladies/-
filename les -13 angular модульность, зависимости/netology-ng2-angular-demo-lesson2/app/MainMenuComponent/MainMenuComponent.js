'use strict';

angular
    .module('myApp')
    .component('mainMenuComponent', {
        templateUrl: 'MainMenuComponent/MainMenuComponent.html',
        controller: function() {
            this.menu = [
                {name: 'Список', sref: 'list'},
                {name: 'Добавить нового', sref: 'createNewPokemon'},
                {name: 'Личный кабинет', sref: 'myaccount'}
            ];

        }
    })