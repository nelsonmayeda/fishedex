(function () {
    'use strict';
    var mod = angular.module('shared');
    mod.component('search', {
        templateUrl: '/App/Shared/Search/search.html',
        controller: 'searchController',
        controllerAs: 'vm'
    });
    mod.controller('searchController', ['$location', '$state', searchController]);
    function searchController($location, $state) {
        var vm = this;
        vm.Model = {
            Title: ""
        };
        vm.submit = function () {
            vm.redirect();
        };
        vm.redirect = _redirect;
        vm.collapsed = true;
        vm.searchToggle = function () {
            vm.collapsed = !vm.collapsed;
        };
        function _redirect() {
            //$location.url("/Fish/Search?Title=" + + encodeURI(vm.Model.Title));
            $state.go('app.FishSearch', { Title: vm.Model.Title }, { reload: true });
        };
        return vm;
    }
})();