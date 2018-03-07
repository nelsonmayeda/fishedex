(function () {
    'use strict';
    var mod = angular.module('shared');
    mod.provider('verificationProvider', function () {
        var _csrf = {
            token: ""
        };
        //this isn't likely to change any time soon. using identity framework
        Object.defineProperty(_csrf, "key", {
            value: "__RequestVerificationToken",
            writable: false,
            enumerable: true,
            configurable: true
        });
        this.$get = function () {
            //external controller visibility
            return {
                //NOTE: there is no clearToken function because it should only be cleared when a new token is received
                setToken: function (token) {
                    _csrf.token = token;
                },
                csrf: _csrf
            };
        };
    });
})();