(function () {
    'use strict';
    var mod = angular.module('shared');
    mod.component('banner', {
        templateUrl: '/App/Shared/Banner/banner.html',
        transclude:true,
        bindings: {
            item: '<',
            prefix:'@'
        },
        controller: 'bannerController',
        controllerAs: 'vm'
    });
    mod.controller('bannerController', ['LoadingService', bannerController]);
    function bannerController(LoadingService) {
        var vm = this;
        vm.Loading = LoadingService.State;
        return vm;
    };
})();