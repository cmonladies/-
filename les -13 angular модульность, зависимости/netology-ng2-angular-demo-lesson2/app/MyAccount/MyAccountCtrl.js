'use strict';

angular
    .module('myApp')
    .controller('MyAccountCtrl', function(MyAccountService) {

        var vm = this;

        // ?
        vm.accountService = MyAccountService;

        vm.login = (user) => {

            MyAccountService.login(user);

        };

        vm.checkStatus = () =>
        {
          return MyAccountService.checkStatus();

        };

        vm.getUser = () =>
        {
          return MyAccountService.getInfo();
        };

        vm.logout = () =>
        {
          MyAccountService.logout();
        };

    });
