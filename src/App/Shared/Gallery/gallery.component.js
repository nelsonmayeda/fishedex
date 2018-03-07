(function () {
    'use strict';
    var mod = angular.module('shared');
    mod.component('gallery', {
        templateUrl: '/App/Shared/Gallery/gallery.html',
        transclude: true,
        bindings: {
            list: '<',
            prefix: '@',
            more:'&'
        },
        controller: 'galleryController',
        controllerAs: 'vm'
    });
    mod.controller('galleryController', ['LoadingService', galleryController]);
    function galleryController(LoadingService) {
        var vm = this;
        vm.Loading = LoadingService.State;
        return vm;
    };
})();