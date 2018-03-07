(function () {
    'use strict';
    var mod = angular.module('lists.services', [
        'shared'
    ]);
    mod.factory("ListsServices", ['$http', '$q', 'apiUrlService', function ($http, $q, apiUrlService) {
        return {
            FishEDex: FishEDex,
            Leaderboard: Leaderboard,
            ListsIndex: ListsIndex,
            ListCreate: ListCreate,
            ListDetails: ListDetails,
            ListEdit: ListEdit,
            ListDelete: ListDelete
        };
        function FishEDex(id, userName) {
            var url = apiUrlService.FishEDex();
            return $http.post(url,
                {},
                {
                    dataType: 'json',
                    cache: false,
                    params: { id: id, userName: userName },
                    //cors cookies will cause options preflight
                    withCredentials: true
                }
            ).then(function successCallback(response) {
                return response.data;
            }, function errorCallback(response) {
                return $q.reject(response);
            });
        };
        function Leaderboard(id, after, take) {
            var url = apiUrlService.Leaderboard(id);
            return $http.post(url,
                {},
                {
                    dataType: 'json',
                    cache: false,
                    params: { after: after, take: take },
                    //cors cookies will cause options preflight
                    withCredentials: true
                }
            ).then(function successCallback(response) {
                return response.data;
            }, function errorCallback(response) {
                return $q.reject(response);
            });
        };
        function ListsIndex(after, take) {
            var url = apiUrlService.ListsIndex();
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
        function ListCreate(title, description, file) {
            var payload = new FormData();
            payload.append("Title", title);
            payload.append("Description", description);
            payload.append("imageFile", file);
            var url = apiUrlService.ListCreate();
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
        function ListDetails(id) {
            var url = apiUrlService.ListDetails(id);
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
        function ListEdit(id, title, description, file) {
            var payload = new FormData();
            payload.append("Id", id);
            payload.append("Title", title);
            payload.append("Description", description);
            payload.append("imageFile", file);
            var url = apiUrlService.ListEdit(id);
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
        function ListDelete(id) {
            var payload = new FormData();
            payload.append("categoryId", id);
            var url = apiUrlService.ListDelete(id);
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