(function () {
    'use strict';
    var mod = angular.module('species.controllers', [
        'ui.router',
        'species.services',
        'shared'
    ]);
    mod.controller('speciesCreateController', ['$scope', '$location', '$stateParams', 'fileService', 'LoadingService', 'SpeciesServices', 'modalService', 'titleService', speciesCreateController]);
    mod.controller('speciesDetailsController', ['$location', '$stateParams', 'LoadingService', 'SpeciesServices', 'breadService', 'titleService', speciesDetailsController]);
    mod.controller('speciesEditController', ['$scope', '$location', '$stateParams', 'fileService', 'LoadingService', 'SpeciesServices', 'modalService', 'titleService', speciesEditController]);
    mod.controller('speciesDeleteController', ['$location', '$stateParams', 'LoadingService', 'SpeciesServices', 'modalService', 'titleService', speciesDeleteController]);
    function speciesCreateController($scope, $location, $stateParams, fileService, LoadingService, SpeciesServices, modalService,titleService) {
        var vm = this;
        var categoryId = $stateParams.categoryId;
        titleService.setTitle('Species Create - ' + categoryId);

        //public
        vm.Model = {
            CategoryId: categoryId,
            Title: "",
            Description: "",
            TileURL: ""
        };
        vm.redirect = _redirect;
        vm.handleFiles = _handleFiles;
        vm.save = _save;
        vm.Loading = LoadingService.State;
        //vm.Loading = {
        //    Active: false,
        //    Error: false,
        //    Message: ""
        //};

        //private
        function _handleFiles() {
            LoadingService.Start("Loading");
            fileService.readAsDataUrl($scope)
                .then(function successCallback(result) {
                    LoadingService.Success("Success");
                    vm.Model.TileURL = result;
                }, function errorCallback(response) {
                    LoadingService.Error(response);
                });
        };
        function _save() {
            LoadingService.Start("Loading");
            modalService.open("Creating");
            var file = fileService.getFirstFile();
            SpeciesServices.SpeciesCreate(categoryId, vm.Model.Title, vm.Model.Description, file)
                .then(function successCallback(data) {
                    LoadingService.Success("Success");
                    modalService.close();
                    vm.redirect(data.Id);//note calling vm.redirect instead of _redirect for testing purposes
                }, function errorCallback(response) {
                    LoadingService.Error(response);
                    modalService.close();
                });
        };
        function _redirect(id) {
            $location.url("/Species/" + id);
        };
        return vm;
    };
    function speciesDetailsController($location, $stateParams, LoadingService, SpeciesServices, breadService, titleService) {
        var vm = this;
        var speciesId = $stateParams.speciesId;
        var after = $stateParams.after || 0;
        var take = $stateParams.take || 25;
        titleService.setTitle('Species Details - ' + speciesId);

        //public
        vm.Model = {
            Id: speciesId,
            Title: "",
            Description: "",
            TileURL: "",
            CategoryId:""
        };
        vm.wiki={
            title: "",
            extract:"",
            fullurl:""
        };
        vm.init = _init;
        vm.LoadMore = _loadMore;
        vm.LoadWiki = _loadWiki;
        vm.Loading = LoadingService.State;
        //vm.Loading = {
        //    Active: false,
        //    Error: false,
        //    Message: ""
        //};

        //private
        function _loadMore() {
            LoadingService.Start("Loading");
            var last = after;
            if (vm.Model && vm.Model.FishList && vm.Model.FishList.length) {
                last = vm.Model.FishList[vm.Model.FishList.length - 1].Id;
            }
            SpeciesServices.SpeciesDetails(speciesId, last, take)
                .then(function successCallback(data) {
                    //$location.search('after', last);//change url
                    LoadingService.Success("Success");
                    if (data && data.FishList) {
                        vm.Model.FishList = vm.Model.FishList.concat(data.FishList);
                    }
                }, function errorCallback(response) {
                    LoadingService.Error(response);
                });
        };
        function _loadWiki(title) {
            LoadingService.Start("Loading");
            SpeciesServices.SpeciesWiki(title)
                .then(function successCallback(data) {
                    LoadingService.Success("Success");
                    vm.wiki = data;
                }, function errorCallback(response) {
                    LoadingService.Error(response);
                    vm.wiki.title = "Error";
                });
        };
        function _init() {
            LoadingService.Start("Loading");
            SpeciesServices.SpeciesDetails(speciesId, after, take)
                .then(function successCallback(data) {
                    LoadingService.Success("Success");
                    vm.Model = data;
                    titleService.setTitle('Species Details - ' + data.Title);
                    return data.Title;
                }, function errorCallback(response) {
                    LoadingService.Error(response);
                })
                .then(function (title) {
                    _loadWiki(title);
                }, function errorCallback() { }
                );
        };

        vm.init();//note calling vm.init instead of _init for testing purposes
        return vm;
    };
    function speciesEditController($scope, $location, $stateParams, fileService, LoadingService, SpeciesServices, modalService, titleService) {
        var vm = this;
        var speciesId = $stateParams.speciesId;
        titleService.setTitle('Species Edit - ' + speciesId);

        //public
        vm.Model = {
            Id: speciesId,
            Title: "",
            Description: "",
            TileURL: ""
        };
        vm.init = _init;
        vm.redirect = _redirect;
        vm.handleFiles = _handleFiles;
        vm.save = _save;
        vm.Loading = LoadingService.State;
        //vm.Loading = {
        //    Active: false,
        //    Error: false,
        //    Message: ""
        //};

        //private
        function _handleFiles() {
            LoadingService.Start("Loading");
            fileService.readAsDataUrl($scope)
              .then(function successCallback(result) {
                  LoadingService.Success("Success");
                  vm.Model.TileURL = result;
              }, function errorCallback(response) {
                  LoadingService.Error(response);
              });
        };
        function _save() {
            LoadingService.Start("Loading");
            modalService.open("Editing");
            var file = fileService.getFirstFile();
            SpeciesServices.SpeciesEdit(
                vm.Model.Id, vm.Model.Title, vm.Model.Description, file
            ).then(function successCallback(data) {
                LoadingService.Success("Success");
                modalService.close();
                vm.redirect(data.Id);//note calling vm.redirect instead of _redirect for testing purposes
            }, function errorCallback(response) {
                LoadingService.Error(response);
                modalService.close();
            });
        };
        function _redirect(id) {
            $location.url("/Species/" + id);
        };
        function _init() {
            LoadingService.Start("Loading");
            SpeciesServices.SpeciesDetails(speciesId)
                .then(function successCallback(data) {
                    LoadingService.Success("Success");
                    vm.Model = data;
                    titleService.setTitle('Species Edit - ' + data.Title);
                }, function errorCallback(response) {
                    LoadingService.Error(response);
                });
        }

        vm.init();//note calling vm.init instead of _init for testing purposes
        return vm;
    };
    function speciesDeleteController($location, $stateParams, LoadingService, SpeciesServices, modalService, titleService) {
        var vm = this;
        var speciesId = $stateParams.speciesId;
        titleService.setTitle('Species Delete - ' + speciesId);

        //public
        vm.Model = {
            Id: speciesId,
            Title: "",
            Description: "",
            TileURL: "",
            CategoryId:0
        };
        vm.init = _init;
        vm.redirect = _redirect;
        vm.delete = _delete;
        vm.Loading = LoadingService.State;
        //vm.Loading = {
        //    Active: false,
        //    Error: false,
        //    Message: ""
        //};

        //private
        function _redirect() {
            $location.url("/Lists/" + vm.Model.CategoryId);
        };
        function _delete() {
            LoadingService.Start("Loading");
            modalService.open("Deleting");
            SpeciesServices.SpeciesDelete(speciesId)
                .then(function successCallback(data) {
                    LoadingService.Success("Success");
                    modalService.close();
                    vm.redirect();//note calling vm.redirect instead of _redirect for testing purposes
                }, function errorCallback(response) {
                    LoadingService.Error(response);
                    modalService.close();
                });
        };
        function _init() {
            LoadingService.Start("Loading");
            SpeciesServices.SpeciesDetails(speciesId)
                .then(function (data) {
                    LoadingService.Success("Success");
                    vm.Model = data;
                    titleService.setTitle('Species Delete - ' + data.Title);
                }, function errorCallback(response) {
                    LoadingService.Error(response);
                });
        }

        vm.init();//note calling vm.init instead of _init for testing purposes
        return vm;
    };
})();