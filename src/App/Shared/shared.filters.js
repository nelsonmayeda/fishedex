(function () {
    'use strict';
    var mod = angular.module('shared');
    mod.filter("removeWhitespace", function () {
        return function (text) {
            if (!text) return text;
            return text.replace(/[\s]/g, '');
        };
    });
})();