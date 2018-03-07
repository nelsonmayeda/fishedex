(function () {
    'use strict';
    var mod = angular.module('shared');
    mod.component('sidebar', {
        templateUrl: '/App/Shared/Menu/menu.html',
        bindings: {
            locations: '<', //one way input data binding: locations from fishedex component
            update: '&' //event emitter: click events for fishedex component
        },
        controller: 'menuController',
        controllerAs: 'vm'
    });
    mod.factory("menuService", [menuService]);
    mod.factory("toggleMenuService", ['$transitions', toggleMenuService]);
    mod.controller('menuController', ['menuService', 'toggleMenuService', menuController]);
    function menuController(menuService,toggleMenuService) {
        var vm = this;
        vm.toggleState = toggleMenuService.state;
        vm.toggleClick = toggleMenuService.toggle;
        /*reset*/
        vm.isReset = menuService.isReset;
        vm.resetClick = function (value) {
            toggleMenuService.toggle();
            menuService.resetClick(value);
            _updateEvent("");
        };
        /*"Show" me/everyone filters*/
        vm.showIsActive = menuService.showIsActive;
        vm.showClick = function (value) {
            toggleMenuService.toggle();
            menuService.showClick(value);
            _updateEvent(value);
        };
        /*"Status" caught/uncaught filters*/
        vm.statusIsActive = menuService.statusIsActive;
        vm.statusClick = function (value) {
            toggleMenuService.toggle();
            menuService.statusClick(value);
        };
        /*"Location" ocean,fresh,etc filters*/
        vm.locationIsActive = menuService.locationIsActive;
        vm.locationClick = function (value) {
            toggleMenuService.toggle();
            menuService.locationClick(value);
        };
        /*"Sort" by alphabet/location*/
        vm.sortIsActive = menuService.sortIsActive;
        vm.sortIsReverse = menuService.sortIsReverse;
        vm.sortClick = function (value) {
            toggleMenuService.toggle();
            menuService.sortClick(value);
        };
        vm.init = _init;
        /*fishedex controller is listening to this event*/
        function _updateEvent(value) {
            //remapping value
            var ret = "";
            if (value == 'Everyone') { ret = "Anonymous"; }
            //emit update event
            //NOTE the propertyName is a magic string, on other end func(propname) must match up
            vm.update({
                value: {
                    name: ret
                }
            });
        };
        function _init() {
            toggleMenuService.state.isActive = true;
        };
        vm.init();
        return vm;
    };
    function menuService() {
        var showFilters = []; //Me, Everyone
        var statusFilters = [];//Caught,UnCaught
        var locationFilters = [];//Anadromous Fishes, Cold Freshwater, Freshwater Shellfish, Ocean Fishes, Ocean Shellfish, Warm Freshwater
        var sortFilters = [];//Id,Title,Species.Location
        var sortReverse = false;

        function isReset() {
            return (!showFilters.length
                && !statusFilters.length
                && !locationFilters.length
                && !sortFilters.length
                && !sortReverse);
        };
        function resetClick() {
            showFilters = [];
            statusFilters = [];
            locationFilters = [];
            sortFilters = [];
            sortReverse = false;
        };
        //NOTE: only allowing single values now
        //for multiple value allow
        //var i = locationFilters.indexOf(location);
        //if (i >= 0) {
        //    /*remove from list*/
        //    locationFilters.splice(i, 1);
        //} else {
        //    /*add to list*/
        //    locationFilters.push(location);
        //}
        function showClick(value) {
            var i = showFilters.indexOf(value);
            if (i >= 0) {
                /*remove from list*/
                showFilters.splice(i, 1);
            } else {
                showFilters = [value];
            }
        };
        function showIsActive(value) {
            return (showFilters.indexOf(value) >= 0);
        };
        function statusClick(value) {
            var i = statusFilters.indexOf(value);
            if (i >= 0) {
                /*remove from list*/
                statusFilters.splice(i, 1);
            } else {
                statusFilters = [value];
            }
        };
        function statusIsActive(value) {
            return (statusFilters.indexOf(value) >= 0);
        };
        function locationClick(value) {
            var i = locationFilters.indexOf(value);
            if (i >= 0) {
                /*remove from list*/
                locationFilters.splice(i, 1);
            } else {
                locationFilters = [value];
            }
        };
        function locationIsActive(value) {
            return (locationFilters.indexOf(value) >= 0);
        };
        function sortClick(value) {
            if (sortIsActive(value)) {
                sortReverse = !sortReverse;
            } else {
                sortReverse = false;
            }
            sortFilters = [value];
        };
        function sortIsActive(value) {
            return (sortFilters.indexOf(value) >= 0);
        };
        function sortIsReverse() {
            return sortReverse;
        };
        function sortProperty() {
            if (sortFilters.length)
                return sortFilters[0];
            else
                return "";
        };
        function filterFunction(item) {
            if (statusIsActive('Caught') && !item.Fish) {
                return false;
            }
            if (statusIsActive('UnCaught') && item.Fish) {
                return false;
            }
            if (locationFilters.length) {
                var location = item ? item.Species ? item.Species.Location : "" : "";
                if (!locationIsActive(location))
                    return false;
            }
            return true;
        };
        return {
            isReset: isReset,
            resetClick: resetClick,
            showIsActive: showIsActive,
            showClick: showClick,
            statusIsActive: statusIsActive,
            statusClick: statusClick,
            locationIsActive: locationIsActive,
            locationClick: locationClick,
            sortIsActive: sortIsActive,
            sortClick: sortClick,
            sortProperty: sortProperty,
            sortIsReverse: sortIsReverse,
            filterFunction: filterFunction
        };
    };
    function toggleMenuService($transitions) {

        var _state = {
            isToggled: true,
            isActive:false
        };
        var _toggle = function () {
            _state.isToggled = !_state.isToggled;
        };
        $transitions.onSuccess({ to: 'app.**', from: 'app.**' }, function (transition, state) {

            _state.isToggled = true;
            _state.isActive = false;
        });
        return {
            toggle: _toggle,
            state: _state
        };
    };
})();