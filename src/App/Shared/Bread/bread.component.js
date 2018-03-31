(function () {
    'use strict';
    var mod = angular.module('shared');
    mod.component('bread', {
        templateUrl: '/App/Shared/Bread/bread.html',
        controller: 'breadController',
        controllerAs: 'vm'
    });
    mod.factory("breadService", [breadService]);
    mod.controller('breadController', ['$state', '$transitions', '$stateParams', 'breadService', "toggleNavService", breadController]);
    function breadController($state, $transitions, $stateParams, breadService, toggleNavService) {
        var vm = this;
        vm.state = toggleNavService.state;
        vm.crumbs = breadService.state;
        vm.links = [];
        vm.toggle = function () {
            toggleNavService.toggle();
        };
        //Note:onSuccess only fires after change, onEnter fires on hot load
        //but forcing crumb update at bottom of this controller for initial load
        $transitions.onSuccess({ to: 'app.**', from: 'app.**' }, function (transition, state) {
            updateCrumbs();
        });
        function doStuff() {
            vm.links = [];
            vm.links.push(
                {
                    //note relative no leading slash urls
                    //needed for subdirectory hosting on github
                    url: 'Lists/'+breadService.state.categoryId+'/FishEDex',
                    active: breadService.state.currentName.toLowerCase().includes('fishedex'),
                    title: 'FishEDex',
                    show:true
                }
            );
            vm.links.push(
                {
                    //note relative no leading slash urls
                    //needed for subdirectory hosting on github
                    url: 'Lists/' + breadService.state.categoryId + '/Leaderboard',
                    active: breadService.state.currentName.toLowerCase().includes('leaderboard'),
                    title: 'Leaderboard',
                    show: true
                }
            );
            vm.links.push(
                {
                    //note that absolute here will take into account the base href
                    //needed for subdirectory hosting on github
                    url: $state.href($state.current.name, $state.params, { absolute: true }),
                    active: true,
                    title: breadService.state.currentName,
                    show: (
                        !breadService.state.currentName.toLowerCase().includes('fishedex')
                        && !breadService.state.currentName.toLowerCase().includes('leaderboard')
                        )
                }
            );
        };
        function updateCrumbs() {
            var crumbs = $state.current.name.split(".");
            if (crumbs.length) {
                breadService.state.currentName = crumbs[crumbs.length - 1];
            }
            if ($stateParams.categoryId) {
                breadService.state.categoryId = $stateParams.categoryId;
            }
            if ($stateParams.speciesId) {
                breadService.state.speciesId = $stateParams.speciesId;
            }
            if ($stateParams.fishId) {
                breadService.state.fishId = $stateParams.fishId;
            }
            doStuff();
        };
        updateCrumbs();
        return vm;
    };
    function breadService() {
        var _state = {
            categoryId: 1,
            speciesId: undefined,
            fishId: undefined,
            currentName:""
        };
        var clearAll = function () {
            _state.categoryId = 1;
            _state.speciesId = undefined;
            _state.fishId = undefined;
            _state.currentName = "";
        };
        var clearCategory = function () {
            _state.categoryId = 1;
        };
        var clearSpecies = function () {
            _state.speciesId = undefined;
        };
        var clearFish = function () {
            _state.fishId = undefined;
        };
        return {
            state: _state,
            ClearCategory: clearCategory,
            ClearSpecies: clearSpecies,
            ClearFish: clearFish,
            ClearAll: clearAll
        };
    };
})();