(function () {
    'use strict';
    var mod = angular.module('shared');
    mod.component('genericdetails', {
        templateUrl: '/App/Shared/Form/Details.html',
        transclude: true,
        bindings: {
            item: '<'
        },
        controller: 'genericdetailsController',
        controllerAs: 'vm'
    });
    mod.component('genericsave', {
        templateUrl: '/App/Shared/Form/Save.html',
        transclude: true,
        bindings: {
            item: '<',
            submit: '&',
            handlefiles: '&'
        },
        controller: 'genericsaveController',
        controllerAs: 'vm'
    });
    mod.component('genericdelete', {
        templateUrl: '/App/Shared/Form/Delete.html',
        transclude: true,
        bindings: {
            item: '<',
            submit: '&',
            handlefiles: '&'
        },
        controller: 'genericdeleteController',
        controllerAs: 'vm'
    });
    mod.controller('genericdetailsController', ['LoadingService', genericdetailsController]);
    mod.controller('genericsaveController', ['LoadingService', genericsaveController]);
    mod.controller('genericdeleteController', ['LoadingService', genericdeleteController]);
    function genericdetailsController(LoadingService) {
        var vm = this;
        vm.Loading = LoadingService.State;
        return vm;
    };
    function genericsaveController(LoadingService) {
        var vm = this;
        vm.Loading = LoadingService.State;
        return vm;
    };
    function genericdeleteController(LoadingService) {
        var vm = this;
        vm.Loading = LoadingService.State;
        return vm;
    };
})();