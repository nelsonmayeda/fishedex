(function () {
    'use strict';
    var mod = angular.module('home.controllers', [
        'shared'
    ]);
    mod.controller('aboutController', ['titleService', aboutController]);
    mod.controller('contactController', ['titleService', contactController]);
    mod.controller('privacyController', ['titleService', privacyController]);
    mod.controller('notFoundController', ['titleService', notFoundController]);

    function aboutController(titleService) {
        var vm = this;
        titleService.setTitle('About');
        return vm;
    }
    function contactController(titleService) {
        var vm = this;
        titleService.setTitle('Contact');
        return vm;
    }
    function privacyController(titleService) {
        var vm = this;
        titleService.setTitle('Privacy');
        return vm;
    }
    function notFoundController(titleService) {
        var vm = this;
        titleService.setTitle('Page Not Found');
        return vm;
    };
})();