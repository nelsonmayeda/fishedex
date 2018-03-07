(function () {
    'use strict';
    var mod = angular.module('fish.services', [
        'shared'
    ]);
    mod.factory("FishServices", ['$http', '$q', 'apiUrlService', function ($http, $q, apiUrlService) {
        return {
            FishIndex: _fishIndex,
            FishCreate: _fishCreate,
            FishDetails: _fishDetails,
            FishEdit: _fishEdit,
            FishDelete: _fishDelete,
            FishUpload: _fishUpload,
            FishSearch: _fishSearch
        };
        function _fishIndex(after, take) {
            var url = apiUrlService.FishIndex();
            return $http.post(url,
                {},
                {
                    dataType: 'json',
                    cache: false,
                    params: {
                        after: after,
                        take: take
                    }
                }
            ).then(function successCallback(response) {
                return response.data;
            }, function errorCallback(response) {
                return $q.reject(response);
            });
        };
        function _fishCreate(title, description, file) {
            var payload = new FormData();
            payload.append("Title", title);
            payload.append("Description", description);
            payload.append("imageFile", file);
            var url = apiUrlService.FishCreate();
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
        function _fishDetails(id) {
            var url = apiUrlService.FishDetails(id);
            return $http.post(url,
                {},
                {
                    dataType: 'json',
                    cache: false
                }
            ).then(function successCallback(response) {
                return response.data;
            }, function errorCallback(response) {
                return $q.reject(response);
            });
        };
        function _fishEdit(id, title, description, file) {
            var payload = new FormData();
            payload.append("Id", id);
            payload.append("Title", title);
            payload.append("Description", description);
            payload.append("imageFile", file);
            var url = apiUrlService.FishEdit(id);
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
        function _fishDelete(id) {
            var payload = new FormData();
            payload.append("fishId", id);
            var url = apiUrlService.FishDelete(id);
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
        function _fishUpload(files) {
            var payload = new FormData();
            for (var i = 0; i < files.length; i++) {
                payload.append("imageFiles", files[i]);
            }
            var url = apiUrlService.FishUpload();
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
        function _fishSearch(after, take, list, title, user) {
            var payload = new FormData();
            payload.append("after", after);
            payload.append("take", take);
            payload.append("title", title);
            payload.append("listName", list);
            payload.append("userName", user);
            var url = apiUrlService.FishSearch();
            return $http.post(url,
                payload,
                {
                    //note that content-type: multipart/form-data does not work, file does not get uploaded
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