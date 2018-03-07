(function () {
    'use strict';
    var mod = angular.module('account.services');
    mod.controller('headerController', ['LoadingService', 'accountServices', 'authProvider', 'toggleMenuService', 'toggleNavService', 'modalService', headerController]);
    function headerController(LoadingService, accountServices, authProvider, toggleMenuService, toggleNavService, modalService) {
        var vm = this;
        vm.navState = toggleNavService.state;
        vm.menuState = toggleMenuService.state;
        vm.authentication = authProvider.authentication;
        vm.menuToggle = function () {
            toggleMenuService.toggle();
        };
        vm.navToggle = function () {
            toggleNavService.toggle();
        };
        vm.logout = function () {
            LoadingService.Start("Loading");
            modalService.open("Logging out");
            accountServices.logout()
            .then(function successCallback(response) {
                LoadingService.Success("Success");
                modalService.close();
            }, function errorCallback(response) {
                LoadingService.Error(response);
                modalService.close();
            });
        };
        return vm;
    };
    var shared = angular.module('shared');
    shared.factory("toggleNavService", ['$transitions',function ($transitions) {

        var _state = {
            isToggled: true
        };
        var _toggle = function () {
            _state.isToggled = !_state.isToggled;
        };
        $transitions.onSuccess({ to: 'app.**', from: 'app.**' }, function (transition, state) {
            _state.isToggled = true;
        });
        return {
            toggle: _toggle,
            state: _state
        };
    }]);
})();