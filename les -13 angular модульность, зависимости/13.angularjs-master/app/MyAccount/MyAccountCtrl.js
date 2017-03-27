'use strict';

angular
    .module('myApp')
    .controller('MyAccountCtrl', [ 'MyAccountService', function(MyAccountService) {

        var vm = this;
        vm.accountService = MyAccountService;

        vm.addInfo = function(account) {

            MyAccountService.addInfo(account);

        };

    }]);
