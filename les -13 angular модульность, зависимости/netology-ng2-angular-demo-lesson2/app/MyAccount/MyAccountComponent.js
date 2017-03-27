'use strict';

angular
    .module('myApp')
    .component('myAccountComponent', {
        templateUrl: 'MyAccount/accountBox.html',
        controller: function(MyAccountService) {
            var vm = this;
            vm.status = MyAccountService.checkStatus();

            vm.getStatus = () =>
            {
                vm.user = MyAccountService.getInfo();
            };
        }
    });