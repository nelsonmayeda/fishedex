(function () {
    'use strict';
    var mod = angular.module('lists.controllers', [
        'ui.router',
        'lists.services',
        'shared'
    ]);
    mod.controller('fishedexController', ['$stateParams', 'menuService', 'ListsServices', 'LoadingService', 'titleService', fishedexController]);
    mod.controller('listsLeaderboardController', ['$location', '$stateParams', 'ListsServices', 'LoadingService', 'titleService', listsLeaderboardController]);
    mod.controller('listsIndexController', ['$location', '$stateParams', 'ListsServices', 'LoadingService', 'titleService', listsIndexController]);
    mod.controller('listsCreateController', ['$scope', '$location', 'fileService', 'ListsServices', 'LoadingService', 'modalService', 'titleService', listsCreateController]);
    mod.controller('listsDetailsController', ['$stateParams', 'LoadingService', 'ListsServices', 'titleService', listsDetailsController]);
    mod.controller('listsEditController', ['$scope', '$location', '$stateParams', 'fileService', 'ListsServices', 'LoadingService', 'modalService', 'titleService', listsEditController]);
    mod.controller('listsDeleteController', ['$location', '$stateParams', 'fileService', 'ListsServices', 'LoadingService', 'modalService', 'titleService', listsDeleteController]);
    function fishedexController($stateParams, menuService, ListsServices, LoadingService,titleService) {
        var vm = this;
        var categoryId = $stateParams.categoryId;//this may be undefined
        titleService.setTitle('FishEDex' + (categoryId ? (' - ' + categoryId) : ''));
        //public
        vm.Model = {
            Id: categoryId,
            UserName: "",//gets overridden by server data from init()
            ComboList: [],
            Locations: [],
            Title: "",
            TileURL: ""
        };
        vm.sortProperty = menuService.sortProperty;
        vm.sortIsReverse = menuService.sortIsReverse;
        vm.filterFunction = menuService.filterFunction;
        vm.updateFilters = _updateFilters;
        vm.init = _init;
        vm.Loading = LoadingService.State;
        //vm.Loading = {
        //    Active: false,
        //    Error: false,
        //    Message: ""
        //};

        //private
        function _updateFilters(value) {
            //show me(""),everyone("Anonymous")
            LoadingService.Start("Loading");
            ListsServices.FishEDex(categoryId, value.name)
                .then(function successCallback(data) {
                    LoadingService.Success("Success");
                    vm.Model = data;
                }, function errorCallback(response) {
                    LoadingService.Error(response);
                });
        };
        function _init() {
            LoadingService.Start("Loading");
            ListsServices.FishEDex(categoryId, "")
                .then(function successCallback(data) {
                    LoadingService.Success("Success");
                    vm.Model = data;
                    titleService.setTitle('FishEDex - ' + data.Title);
                }, function errorCallback(response) {
                    LoadingService.Error(response);
                });
        };

        vm.init();//note calling vm.init instead of _init for testing purposes
        return vm;
    };
    function listsLeaderboardController($location, $stateParams, ListsServices, LoadingService, titleService) {
        var vm = this;
        var after = $stateParams.after || "";//after username
        var take = $stateParams.take || 25;
        var categoryId = $stateParams.categoryId;
        titleService.setTitle('Leaderboard - ' + categoryId);
        //public
        vm.Model = {
            Id: categoryId,
            Title: "",
            TileURL: "",
            LeaderboardList: []
        };
        vm.init = _init;
        vm.LoadMore = _loadMore;
        vm.Loading = LoadingService.State;
        //vm.Loading = {
        //    Active: false,
        //    Error: false,
        //    Message: ""
        //};

        //private
        function _loadMore() {
            var last = after;//after username
            if (vm.Model && vm.Model.LeaderboardList && vm.Model.LeaderboardList.length) {
                last = vm.Model.LeaderboardList[vm.Model.LeaderboardList.length - 1].UserName;
            }
            LoadingService.Start("Loading");
            ListsServices.Leaderboard(categoryId, last, take)
                .then(function successCallback(data) {
                    //$location.search('after', last);//change url
                    LoadingService.Success("Success");
                    if (data && data.LeaderboardList && data.LeaderboardList.length) {
                        vm.Model.LeaderboardList = vm.Model.LeaderboardList.concat(data.LeaderboardList);
                    }
                }, function errorCallback(response) {
                    LoadingService.Error(response);
                });
        };
        function _init() {
            LoadingService.Start("Loading");
            ListsServices.Leaderboard(categoryId, after, take)
                .then(function successCallback(data) {
                    LoadingService.Success("Success");
                    vm.Model = data;
                    titleService.setTitle('Leaderboard - ' + data.Title);
                }, function errorCallback(response) {
                    LoadingService.Error(response);
                });
        };

        vm.init();//note calling vm.init instead of _init for testing purposes
        return vm;
    };
    function listsIndexController($location, $stateParams, ListsServices, LoadingService, titleService) {
        var vm = this;
        var after = $stateParams.after || 0;//after list id
        var take = $stateParams.take || 25;
        titleService.setTitle('Lists Index');

        //public
        vm.Model = {
            Title: "Lists Index",
            Description:"All the lists",
            CategoryList: []
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
            var last = 0;//after list id
            if (vm.Model && vm.Model.CategoryList && vm.Model.CategoryList.length) {
                last = vm.Model.CategoryList[vm.Model.CategoryList.length - 1].Id;
            }
            LoadingService.Start("Loading");
            ListsServices.ListsIndex(last, take)
                .then(function successCallback(data) {
                    //$location.search('after', last);
                    LoadingService.Success("Success");
                    if (data && data.CategoryList && data.CategoryList.length) {
                        vm.Model.CategoryList = vm.Model.CategoryList.concat(data.CategoryList);
                    }
                }, function errorCallback(response) {
                    LoadingService.Error(response);
                });
        };
        function _init() {
            LoadingService.Start("Loading");
            ListsServices.ListsIndex(after, take)
                .then(function successCallback(data) {
                    LoadingService.Success("Success");
                    vm.Model = data;
                }, function errorCallback(response) {
                    LoadingService.Error(response);
                });
        };

        vm.init();//note calling vm.init instead of _init for testing purposes
        return vm;
    };
    function listsCreateController($scope, $location, fileService, ListsServices, LoadingService, modalService, titleService) {
        var vm = this;
        titleService.setTitle('List Create');

        //public
        vm.Model = {
            Id: "",
            Title: "",
            Description: "",
            TileURL: ""
        };
        vm.handleFiles = _handleFiles;
        vm.redirect = _redirect;
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
                .then(function successCallback(response) {
                    LoadingService.Success("Success");
                    vm.Model.TileURL = response;
                }, function errorCallback(response) {
                    LoadingService.Error(response);
                });
        };
        function _save() {
            var file = fileService.getFirstFile();
            LoadingService.Start("Loading");
            modalService.open("Creating");
            ListsServices.ListCreate(vm.Model.Title, vm.Model.Description, file)
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
            $location.url("/Lists/" + id);
        };
        return vm;
    };
    function listsDetailsController($stateParams, LoadingService, ListsServices, titleService) {
        var vm = this;
        var categoryId = $stateParams.categoryId;
        titleService.setTitle('List Details - ' + categoryId);

        //public
        vm.Model = {
            Id: categoryId,
            Title: "",
            Description: "",
            TileURL: "",
            SpeciesList:[]
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
            var last = 0;//after list id
            if (vm.Model && vm.Model.SpeciesList && vm.Model.SpeciesList.length) {
                last = vm.Model.SpeciesList[vm.Model.SpeciesList.length - 1].Id;
            }
            LoadingService.Start("Loading");
            ListsServices.ListsIndex(last, take)
                .then(function successCallback(data) {
                    //$location.search('after', last);
                    LoadingService.Success("Success");
                    if (data && data.SpeciesList && data.SpeciesList.length) {
                        vm.Model.SpeciesList = vm.Model.SpeciesList.concat(data.SpeciesList);
                    }
                }, function errorCallback(response) {
                    LoadingService.Error(response);
                });
        };
        function _init() {
            LoadingService.Start("Loading");
            ListsServices.ListDetails(categoryId)
                .then(function successCallback(data) {
                    LoadingService.Success("Success");
                    vm.Model = data;
                    titleService.setTitle('List Details - ' +data.Title);
                }, function errorCallback(response) {
                    LoadingService.Error(response);
                });
        };

        vm.init();//note calling vm.init instead of _init for testing purposes
        return vm;
    };
    function listsEditController($scope, $location, $stateParams, fileService, ListsServices, LoadingService, modalService, titleService) {
        var vm = this;
        var categoryId = $stateParams.categoryId;
        titleService.setTitle('List Edit - ' + categoryId);

        //public
        vm.Model = {
            Id: categoryId,
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
            ListsServices.ListEdit(vm.Model.Id, vm.Model.Title, vm.Model.Description, file)
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
            $location.url("/Lists/" + id);
        };
        function _init() {
            LoadingService.Start("Loading");
            ListsServices.ListDetails(categoryId)
                .then(function successCallback(data) {
                    LoadingService.Success("Success");
                    vm.Model = data;
                    titleService.setTitle('List Edit - ' +  data.Title);
                }, function errorCallback(response) {
                    LoadingService.Error(response);
                });
        };

        vm.init();//note calling vm.init instead of _init for testing purposes
        return vm;
    };
    function listsDeleteController($location, $stateParams, fileService, ListsServices, LoadingService, modalService, titleService) {
        var vm = this;
        var categoryId = $stateParams.categoryId;
        titleService.setTitle('List Delete - ' + categoryId);

        //public
        vm.Model = {
            Id: categoryId,
            Title: "",
            Description: "",
            TileURL: ""
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
        function _delete() {
            LoadingService.Start("Loading");
            modalService.open("Deleting");
            ListsServices.ListDelete(categoryId)
                .then(function successCallback(data) {
                    LoadingService.Success("Success");
                    modalService.close();
                    vm.redirect();//note calling vm.redirect instead of _redirect for testing purposes
                }, function errorCallback(response) {
                    LoadingService.Error(response);
                    modalService.close();
                });
        };
        function _redirect() {
            $location.url("/Lists/");
        };
        function _init() {
            LoadingService.Start("Loading");
            ListsServices.ListDetails(categoryId)
                .then(function successCallback(data) {
                    LoadingService.Success("Success");
                    vm.Model = data;
                    titleService.setTitle('List Delete - ' + data.Title);
                }, function errorCallback(response) {
                    LoadingService.Error(response);
                });
        };

        vm.init();//note calling vm.init instead of _init for testing purposes
        return vm;
    };
})();