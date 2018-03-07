//account module
(function () {
    'use strict';
    var mod = angular.module('account', [
        'account.controllers',
        'account.services',
        'shared'
    ]);
    mod.run(['accountServices', function (accountServices) {
        accountServices.refreshToken()
        .then(accountServices.authenticate);
    }]);
})();