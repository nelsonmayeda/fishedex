(function () {
    'use strict';
    var mod = angular.module('shared');
    mod.factory('fileService', ['$q', fileService]);
    mod.directive('filereader', ['fileService', function (fileService) {
        return {
            restrict: 'A',
            link: function (scope, element, attributes) {
                element.on('change', function (event) {
                    var e = this;
                    if (e.attributes && e.attributes.filereader) {
                        //NOTE: still want to setchange without a callback function, another controller may sync itself ie. know to use the files[] later
                        var onChangeHandler = scope.$eval(e.attributes.filereader.value);
                        fileService.setChange(event, onChangeHandler);
                    }
                });
                //NOTE: not deleting files on.($destroy) because upload in navbar uses it across pages
            }
        };
    }]);
    function fileService($q) {
        var files = [];
        var setChange = function (event, onChangeHandler) {
            files = event.target.files;
            if (onChangeHandler && typeof onChangeHandler === "function") {
                onChangeHandler();
            }
        };
        var onload = function (reader, deferred, scope) {
            return function () {
                scope.$apply(function () {
                    deferred.resolve(reader.result);
                });
            };
        };
        var onerror = function (reader, deferred, scope) {
            return function () {
                scope.$apply(function () {
                    deferred.reject(reader.result);
                });
            };
        };

        var getReader = function (deferred, scope) {
            var reader = new FileReader();
            reader.onload = onload(reader, deferred, scope);
            reader.onerror = onerror(reader, deferred, scope);
            return reader;
        };

        var readAsDataURL = function (scope) {
            var deferred = $q.defer();
            if (files && files.length) {
                var reader = getReader(deferred, scope);
                reader.readAsDataURL(files[0]);
            } else {
                deferred.resolve(null);
            }
            return deferred.promise;
        };

        var getFiles = function () {
            return files;
        };
        var getFirstFile = function () {
            if (files && files.length) {
                return files[0];
            }
            return null;
        };
        return {
            setChange: setChange,
            getFirstFile: getFirstFile,
            getFiles: getFiles,
            readAsDataUrl: readAsDataURL
        };
    };
})();