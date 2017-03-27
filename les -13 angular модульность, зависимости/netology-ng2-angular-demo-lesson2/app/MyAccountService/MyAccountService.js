'use strict';

angular
    .module('myApp')
    .factory('MyAccountService', function() {

        const user = {
            info: {
                name: null,
                email: null,
                phone: null
            },
            loginStatus: false
        };

        return {
            checkStatus() {
                if(user.loginStatus) {
                    return true;
                }
                else return false;
            },

            getInfo()  {
                if(user.loginStatus) {
                    return user.info;
                } else {
                    return false;
                }
            },
            login (newUser) {
                user.info.name = newUser.name;
                user.info.email = newUser.email;

                if(newUser.phone)
                    user.info.phone = newUser.phone;

                user.loginStatus = true;
            },

            logout() {
                user.loginStatus = false;
            }
        };

    })
