'use strict';

angular
    .module('myApp')
    .factory('MyAccountService', function() {

        const state = {
            info: {
                name: null,
                email: null,
                phone: null
            },
            valid: false
        };

        return {
            getInfo()  {
                if(state.valid) {
                    return state.info;
                } else {
                    return false;
                }
            },
            addInfo(info) {
                state.info.name = info.name;
                state.info.email = info.email;

                if(info.phone) state.info.phone = info.phone;

                state.valid = true;
            },
            removeInfo() {
                state.valid = false;
            }
        };

    })
