(function () {
    'use strict';
    var mod = angular.module('fish.controllers', [
        'ui.router',
        'fish.services',
        'shared'
    ]);
    mod.controller('fishIndexController', ['$location', '$stateParams', 'LoadingService', 'FishServices', 'titleService', fishIndexController]);
    mod.controller('fishCreateController', ['$scope', '$location', 'fileService', 'LoadingService', 'FishServices', 'modalService', 'titleService', fishCreateController]);
    mod.controller('fishUploadController', ['$scope', '$location', 'fileService', 'LoadingService', 'FishServices', 'modalService', 'titleService', fishUploadController]);
    mod.controller('fishDetailsController', ['$stateParams', 'LoadingService', 'FishServices', 'titleService', fishDetailsController]);
    mod.controller('fishEditController', ['$scope', '$location', '$stateParams', 'fileService', 'LoadingService', 'FishServices', 'modalService', 'titleService', fishEditController]);
    mod.controller('fishDeleteController', ['$location', '$stateParams', 'LoadingService', 'FishServices', 'modalService', 'titleService', fishDeleteController]);
    mod.controller('fishSearchController', ['$location', '$stateParams', 'LoadingService', 'FishServices', 'modalService', 'titleService', fishSearchController]);
    function fishIndexController($location, $stateParams, LoadingService, FishServices, titleService) {
        var vm = this;
        var after = $stateParams.after || 0;
        var take = $stateParams.take || 25;
        titleService.setTitle('Fish Index');

        //public
        vm.Model = {
            Title: "Fish Index",
            Description: "All the fish",
            FishList: [],
            CanEdit: false
        };
        vm.LoadMore = _loadMore;
        vm.init = _init;
        vm.Loading = LoadingService.State;
        //vm.Loading = {
        //    Active: false,
        //    Error: false,
        //    Message: ""
        //};

        //private
        function _loadMore() {
            var last = after;
            if (vm.Model && vm.Model.FishList && vm.Model.FishList.length) {
                last = vm.Model.FishList[vm.Model.FishList.length - 1].Id;
            }
            LoadingService.Start("Loading");
            FishServices.FishIndex(last, take)
                .then(function (data) {
                    //adjust url for new after param
                    //$location.search('after', last);
                    LoadingService.Success("Success");
                    if (data && data.FishList) {
                        vm.Model.FishList = vm.Model.FishList.concat(data.FishList);
                    }
                }, function errorCallback(response) {
                    LoadingService.Error(response);
                });
        };
        function _init() {
            LoadingService.Start("Loading");
            FishServices.FishIndex(after, take)
                .then(function (data) {
                    LoadingService.Success("Success");
                    vm.Model.FishList = data.FishList;
                    vm.Model.CanEdit = data.CanEdit;
                }, function errorCallback(response) {
                    LoadingService.Error(response);
                });
        };

        vm.init();//note calling vm.init instead of _init for testing purposes
        return vm;
    };
    function fishCreateController($scope, $location, fileService, LoadingService, FishServices, modalService, titleService) {
        var vm = this;
        titleService.setTitle('Fish Create');

        //public
        vm.Model = {
            Id: "",
            Title: "",
            Description: "",
            TileURL: ""
        };
        vm.handlefiles = _handlefiles;
        vm.submit = _submit;
        vm.redirect = _redirect;
        vm.Loading = LoadingService.State;
        //vm.Loading = {
        //    Active: false,
        //    Error: false,
        //    Message: ""
        //};
        function _handlefiles() {
            LoadingService.Start("Loading");
            fileService.readAsDataUrl($scope)
                .then(function successCallback(response) {
                    LoadingService.Success("Success");
                    vm.Model.TileURL = response;
                }, function errorCallback(response) {
                    LoadingService.Error(response);
                });
        };
        //private
        function _submit() {
            var file = fileService.getFirstFile();
            LoadingService.Start("Loading");
            modalService.open("Creating");
            FishServices.FishCreate(vm.Model.Title, vm.Model.Description, file)
                .then(function (data) {
                    LoadingService.Success("Success");
                    modalService.close();
                    vm.redirect(data.Id);//note calling vm.redirect instead of _redirect for testing purposes
                }, function errorCallback(response) {
                    LoadingService.Error(response);
                    modalService.close();
                });
        };
        function _redirect(id) {
            $location.url("/Fish/" + id);
        };
        return vm;
    };
    function fishUploadController($scope, $location, fileService, LoadingService, FishServices, modalService, titleService) {
        var vm = this;
        titleService.setTitle('Fish Upload');

        //public
        vm.Model = {
            Id: "",
            Title: "",
            Description: "",
            TileURL: ""
        };
        vm.handlefiles = _handlefiles;
        vm.submit = _submit;
        vm.redirect = _redirect;
        vm.Loading = LoadingService.State;
        //vm.Loading = {
        //    Active: false,
        //    Error: false,
        //    Message: ""
        //};
        function _handlefiles() {
            LoadingService.Start("Loading");
            fileService.readAsDataUrl($scope)
                .then(function successCallback(response) {
                    LoadingService.Success("Success");
                    vm.Model.TileURL = response;
                }, function errorCallback(response) {
                    LoadingService.Error(response);
                });
        };
        //private
        function _submit() {
            var file = fileService.getFirstFile();
            LoadingService.Start("Loading");
            modalService.open("Creating");
            FishServices.FishCreate(vm.Model.Title, vm.Model.Description, file)
                .then(function (data) {
                    LoadingService.Success("Success");
                    modalService.close();
                    vm.redirect(data.Id);//note calling vm.redirect instead of _redirect for testing purposes
                }, function errorCallback(response) {
                    LoadingService.Error(response);
                    modalService.close();
                });
        };
        function _redirect(id) {
            $location.url("/Fish/" + id);
        };
        vm.handlefiles();//note calling vm.handlefiles instead of _handlefiles for testing purposes
        return vm;
    };
    function fishDetailsController($stateParams, LoadingService, FishServices, titleService) {
        var vm = this;
        var fishId = $stateParams.fishId;
        titleService.setTitle('Fish Details - ' + fishId);

        //public
        vm.Model = {
            Id: fishId,
            Title: "",
            Description: "",
            TileURL: "",
            UserName: "",
            CreatedDate:""
        };
        vm.init = _init;
        vm.Loading = LoadingService.State;

        //private
        function _init() {
            LoadingService.Start("Loading");
            FishServices.FishDetails(fishId)
                .then(function (data) {
                    LoadingService.Success("Success");
                    vm.Model = data;
                    titleService.setTitle('Fish Details - ' + data.Title);
                }, function errorCallback(response) {
                    LoadingService.Error(response);
                });
        };

        vm.init();//note calling vm.init instead of _init for testing purposes
        return vm;
    };
    function fishEditController($scope, $location, $stateParams, fileService, LoadingService, FishServices, modalService, titleService) {
        var vm = this;
        var fishId = $stateParams.fishId;
        titleService.setTitle('Fish Edit - ' + fishId);

        //public
        vm.Model = {
            Id: fishId,
            Title: "",
            Description: "",
            TileURL: ""
        };
        vm.init = _init;
        vm.handleFiles = _handleFiles;
        vm.save = _save;
        vm.redirect = _redirect;
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
              .then(function (data) {
                  LoadingService.Success("Success");
                  vm.Model.TileURL = data;
              }, function errorCallback(response) {
                  LoadingService.Error(response);
              });
        };
        function _save() {
            var file = fileService.getFirstFile();
            LoadingService.Start("Loading");
            modalService.open("Editing");
            FishServices.FishEdit(vm.Model.Id, vm.Model.Title, vm.Model.Description, file)
                .then(function (data) {
                    LoadingService.Success("Success");
                    modalService.close();
                    vm.redirect(data.Id);//note calling vm.redirect instead of _redirect for testing purposes
                }, function errorCallback(response) {
                    LoadingService.Error(response);
                    modalService.close();
                });
        };
        function _redirect(id) {
            $location.url("/Fish/" + id);
        };

        function _init() {
            LoadingService.Start("Loading");
            FishServices.FishDetails(fishId)
                .then(function (data) {
                    LoadingService.Success("Success");
                    vm.Model = data;
                    titleService.setTitle('Fish Edit - ' + data.Title);
                }, function errorCallback(response) {
                    LoadingService.Error(response);
                });
        };

        vm.init();//note calling vm.init instead of _init for testing purposes
        return vm;
    };
    function fishDeleteController($location, $stateParams, LoadingService, FishServices, modalService, titleService) {
        var vm = this;
        var fishId = $stateParams.fishId;
        titleService.setTitle('Fish Delete - ' + fishId);

        //public
        vm.Model = {
            Id: fishId,
            Title: "",
            Description: "",
            TileURL: ""
        };
        vm.delete = _delete;
        vm.init = _init;
        vm.redirect = _redirect;
        vm.Loading = LoadingService.State;
        //vm.Loading = {
        //    Active: false,
        //    Error: false,
        //    Message: ""
        //};

        //private
        function _delete() {
            LoadingService.Start("Loading");
            modalService.open("Deleting");
            FishServices.FishDelete(fishId)
                .then(function (data) {
                    LoadingService.Success("Success");
                    modalService.close();
                    vm.redirect();//note calling vm.redirect instead of _redirect for testing purposes
                }, function errorCallback(response) {
                    LoadingService.Error(response);
                    modalService.close();
                });
        };
        function _redirect() {
            $location.url('/Fish/');
        };
        function _init(){
            LoadingService.Start("Loading");
            FishServices.FishDetails(fishId)
                .then(function (data) {
                    LoadingService.Success("Success");
                    vm.Model = data;
                    titleService.setTitle('Fish Delete - ' + data.Title);
                }, function errorCallback(response) {
                    LoadingService.Error(response);
                });
        }

        vm.init();//note calling vm.init instead of _init for testing purposes
        return vm;
    };
    function fishSearchController($location, $stateParams, LoadingService, FishServices, modalService, titleService) {
        var vm = this;
        var title = $stateParams.Title || "";
        var list = $stateParams.List || "";
        var user = $stateParams.User || "";
        var search =(title||user||list||"");
        var take = $stateParams.take || 25;
        var after = $stateParams.after || 0;
        titleService.setTitle('Fish Search');

        //public
        vm.Model = {
            Search: search,
            Title: "Fish Search",
            Description: ("Search for " + search),
            FishList: []
        };
        vm.LoadMore = _loadMore;
        vm.init = _init;
        vm.Loading = LoadingService.State;
        //vm.Loading = {
        //    Active: false,
        //    Error: false,
        //    Message: ""
        //};

        //private
        function _loadMore() {
            var last = after;
            if (vm.Model && vm.Model.FishList && vm.Model.FishList.length) {
                last = vm.Model.FishList[vm.Model.FishList.length - 1].Id;
            }
            LoadingService.Start("Loading");
            FishServices.FishSearch(last, take, list, title, user)
                .then(function (data) {
                    //$location.search('after', last);//change url
                    LoadingService.Success("Success");
                    if (data && data.FishList) {
                        vm.Model.FishList = vm.Model.FishList.concat(data.FishList);
                    }
                }, function errorCallback(response) {
                    LoadingService.Error(response);
                });
        };
        function _init(){
            LoadingService.Start("Loading");
            FishServices.FishSearch(after, take, list, title, user)
                .then(function (data) {
                    LoadingService.Success("Success");
                    vm.Model.FishList = data.FishList;
                    vm.Model.CanEdit = data.CanEdit;
                }, function errorCallback(response) {
                    LoadingService.Error(response);
                });
        }

        vm.init();//note calling vm.init instead of _init for testing purposes
        return vm;
    };
})();