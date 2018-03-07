(function () {
    'use strict';
    var mod = angular.module('species.services', [
        'shared'
    ]);
    mod.factory("SpeciesServices", ["$http", '$q', 'apiUrlService', function ($http, $q, apiUrlService) {
        return {
            SpeciesCreate: _speciesCreate,
            SpeciesDetails: _speciesDetails,
            SpeciesWiki: _speciesWiki,
            SpeciesEdit: _speciesEdit,
            SpeciesDelete: _speciesDelete
        };
        function _speciesCreate(id, title, description, file) {
            var payload = new FormData();
            payload.append("CategoryId", id);
            payload.append("Title", title);
            payload.append("Description", description);
            payload.append("imageFile", file);
            var url = apiUrlService.SpeciesCreate(id);
            return $http.post(url,
                payload,
                {
                    //note that setting Content-Type:multipart/form-data does not work
                    headers: { 'Content-Type': undefined },
                    //cors cookies
                    withCredentials: true
                }
            ).then(function successCallback(response) {
                return response.data;
            }, function errorCallback(response) {
                return $q.reject(response);
            });
        };
        function _speciesDetails(id, after, take) {
            var url = apiUrlService.SpeciesDetails(id);
            return $http.post(url,
                {},
                {
                    dataType: 'json',
                    cache: false,
                    params: { after: after, take: take }
                }
            ).then(function successCallback(response) {
                return response.data;
            }, function errorCallback(response) {
                return $q.reject(response);
            });
        };
        function _speciesWiki(title) {
            var url = apiUrlService.Wiki(title);
            return $http.jsonp(url
            ).then(function successCallback(response) {
                var ret = { title: "No description available" };
                if (response.data.query && response.data.query.pages) {
                    var id = Object.keys(response.data.query.pages)[0];
                    ret = response.data.query.pages[id];
                }
                return ret;
            }, function errorCallback(response) {
                return $q.reject(response);
            });
        };
        function _speciesEdit(id, title, description, file) {
            var payload = new FormData();
            payload.append("Id", id);
            payload.append("Title", title);
            payload.append("Description", description);
            payload.append("imageFile", file);
            var url = apiUrlService.SpeciesEdit(id);
            return $http.post(url,
                payload,
                {
                    //note that setting Content-Type:multipart/form-data does not work
                    headers: { 'Content-Type': undefined },
                    //cors cookies
                    withCredentials: true
                }
            ).then(function successCallback(response) {
                return response.data;
            }, function errorCallback(response) {
                return $q.reject(response);
            });
        };
        function _speciesDelete(id) {
            var payload = new FormData();
            payload.append("Id", id);
            var url = apiUrlService.SpeciesDelete(id);
            return $http.post(url,
                payload,
                {
                    //note that setting Content-Type:multipart/form-data does not work
                    headers: { 'Content-Type': undefined },
                    //cors cookies
                    withCredentials: true
                }
            ).then(function successCallback(response) {
                return response.data;
            }, function errorCallback(response) {
                return $q.reject(response);
            });
        };
    }]);
})();