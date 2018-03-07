(function () {
    'use strict';
    var mod = angular.module('shared');
    mod.component('fileupload', {
        templateUrl: '/App/Shared/Fileupload/fileupload.html',
        controller: 'fileController',
        controllerAs: 'vm'
    });
    mod.controller('fileController', ['$scope', '$location', 'fileService', 'FishServices', 'LoadingService', 'modalService', fileController]);
    function fileController($scope, $location, fileService, FishServices, LoadingService, modalService) {
        var vm = this;

        vm.handlefiles = _handleFiles;
        vm.redirect = _redirect;

        function _handleFiles() {
            LoadingService.Start("Loading");
            fileService.readAsDataUrl($scope)
                .then(function successCallback(response) {
                    LoadingService.Success("Success");
                    vm.redirect();
                }, function errorCallback(response) {
                    LoadingService.Error(response);
                });
        };
        function _redirect() {
            $location.url("/Fish/Upload");
        };
        return vm;
    };
})();