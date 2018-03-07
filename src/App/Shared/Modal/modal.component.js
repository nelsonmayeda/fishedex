(function () {
    'use strict';
    var mod = angular.module('shared');
    mod.component('modal', {
        templateUrl: '/App/Shared/Modal/modal.html',
        controller: 'modalController',
        controllerAs: 'vm'
    });
    mod.controller('modalController', ['modalService', modalController]);
    mod.factory('modalService', [modalService]);
    function modalController(modalService) {
        var vm = this;
        vm.state = modalService.state;
        return this;
    };
    function modalService() {
        var _state = { isOpen: false, message: "" };
        return {
            open: function (message) {
                _state.isOpen = true;
                _state.message = message;
            },
            close: function () {
                _state.isOpen = false;
                _state.message = "";
            },
            state: _state
        };
    };
})();