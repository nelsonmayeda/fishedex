(function () {
    'use strict';
    var mod = angular.module('shared');
    mod.component('flipper', {
        templateUrl: '/App/Shared/Flipper/flipper.html',
        transclude: true,
        bindings: { front: '<', back: '<' },
        bindToController: true,
        controllerAs: 'vm'
    });
})();