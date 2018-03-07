(function () {
    'use strict';
    var mod = angular.module('shared', [
        'env'//for service baseurl
    ]);
    /*
    antiforgery settings
    */
    mod.config(['$httpProvider', function ($httpProvider) {
        $httpProvider.defaults.withCredentials = true; //this is required even though withCredentials is on http.post calls
        $httpProvider.interceptors.push(['verificationProvider', function (verificationProvider) {
            return {
                'request': function (config) {
                    if (config && config.method == "POST" && config.withCredentials && config.data.append) {
                        var csrf = verificationProvider.csrf;
                        config.data.append(csrf.key, csrf.token);
                    }
                    return config;
                }
                //NOTE: responseError will see aborted calls as response.status==-1
                //if using interceptor must return q.reject(response)
            };
        }]);
    }]);
})();