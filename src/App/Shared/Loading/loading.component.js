(function () {
    'use strict';
    var mod = angular.module('shared');
    mod.component('loading', {
        templateUrl: '/App/Shared/Loading/loading.html',
        controller: 'loadingController',
        controllerAs: 'vm'
    });
    mod.controller('loadingController', ['$transitions', 'LoadingService', loadingController]);
    mod.factory("LoadingService", [LoadingService]);
    function loadingController($transitions,LoadingService) {
        var vm = this;
        //Note:transitions lifecycle: onBefore,onCreate,onEnter,onError/onSuccess,onExit
        $transitions.onEnter({ to: 'app.**', from: 'app.**' }, function () {
            LoadingService.Reset();
        });
        return vm;
    };
    function LoadingService() {
        var _state = {
            Active: false,
            Error: false,
            Message: ""
        };
        return {
            State: _state,
            Reset: function () {
                _state.Active = false;
                _state.Error = false;
                _state.Message = "";
            },
            Start: function (message) {
                _state.Active = true;
                _state.Error = false;
                _state.Message = message;
            },
            Success: function (message) {
                _state.Active = false;
                _state.Error = false;
                _state.Message = message;
            },
            Error: function (response) {
                _state.Active = false;
                _state.Error = true;
                _state.Message = "Error: ";
                if (response) {
                    //remap -1 code
                    if (response.status == -1) {
                        _state.Message += "Request aborted";
                    } else {
                        _state.Message += response.statusText ? response.statusText : response.status;
                    }
                }
            }
        };
    };
})();