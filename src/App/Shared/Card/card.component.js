(function () {
    'use strict';
    var mod = angular.module('shared');
    mod.component('card', {
        templateUrl: '/App/Shared/Card/card.html',
        transclude: true,
        bindings: {
            item: '<',
            text: '@'
        },
        bindToController: true,
        controllerAs: 'vm'
    });
})();