(function () {
    'use strict';
    var mod = angular.module('account.services', [
        'shared'
    ]);
    mod.provider('authProvider', function () {
        var _authentication = {
            isAuth: false,
            userName: "",
            email: "",
            confirmed: false
        };
        this.$get = function () {
            //external controller visibility
            return {
                resetAuth: function () {
                    _authentication.isAuth = false;
                    _authentication.userName = "";
                    _authentication.email = "";
                    _authentication.confirmed = false;
                },
                setAuth: function (isAuth, userName) {
                    _authentication.isAuth = isAuth;
                    _authentication.userName = userName;
                },
                setEmail: function (email, confirmed) {
                    _authentication.email = email;
                    _authentication.confirmed = confirmed;
                },
                authentication: _authentication
            };
        };
    });
    mod.factory('accountServices', ['$http', '$q', 'apiUrlService', 'verificationProvider', 'authProvider', function ($http, $q, apiUrlService, verificationProvider, authProvider) {
        return {
            refreshToken: _refreshToken,
            authenticate: _authenticate,
            login: _login,
            logout: _logout,
            register: _register,
            forgotPassword: _forgotPassword,
            resetPassword: _resetPassword ,

            setPassword: _setPassword,
            changePassword: _changePassword,
            changeEmail: _changeEmail,
            confirmEmail: _confirmEmail,
            generateEmailConfirmationToken: _generateEmailConfirmationToken
        };
        function _setStuff(response) {
            if (response && response.data) {
                if (response.data.token) {
                    verificationProvider.setToken(response.data.token);
                }
                if (response.data.isAuth && response.data.userName) {
                    authProvider.setAuth(response.data.isAuth, response.data.userName);
                }
                if (response.data.email && response.data.confirmed) {
                    authProvider.setEmail(response.data.email, response.data.confirmed);
                }
            }
        };
        function _refreshToken() {
            var url = apiUrlService.AntiForgeryToken();
            return $http.post(url,
                {},
                {
                    dataType: 'json',
                    cache: false
                }
            ).then(function successCallback(response) {
                _setStuff(response);
                return response.data;
            }, function errorCallback(response) {
                return $q.reject(response);
            });
        };
        //at startup, have to request username from server because cookies are by httponly
        function _authenticate() {
            var payload = new FormData(); //empty payload for antiforgery cookie to be added by interceptor
            var url = apiUrlService.Authenticate();
            return $http.post(url,
                payload,
                {
                    //note that setting Content-Type does not work, doesn't populate payload, leave undefined
                    headers: { 'Content-Type': undefined },
                    dataType: 'json',
                    cache: false,
                    //cors cookies will cause options preflight
                    withCredentials: true
                }
            ).then(function successCallback(response) {
                _setStuff(response);
                return response.data;
            }, function errorCallback(response) {
                return $q.reject(response);
            });
        };
        function _login(username, password, rememberme) {
            var payload = new FormData();
            payload.append("Username", username);
            payload.append("Password", password);
            payload.append("RememberMe", rememberme);
            var url = apiUrlService.Login();
            return $http.post(url,
                payload,
                {
                    //note that setting Content-Type does not work, doesn't populate payload, leave undefined
                    headers: { 'Content-Type': undefined },
                    //cors cookies will cause options preflight
                    withCredentials: true
                }
            ).then(function successCallback(response) {
                _setStuff(response);
                return response.data;
            }, function errorCallback(response) {
                return $q.reject(response);
            });
        };
        function _logout() {
            var payload = new FormData();
            //payload.append(_verification.key, _verification.token);
            var url = apiUrlService.LogOut();
            return $http.post(url,
                payload,
                {
                    //note that setting Content-Type does not work, doesn't populate payload, leave undefined
                    headers: { 'Content-Type': undefined },
                    //cors cookies will cause options preflight
                    withCredentials: true
                }
            ).then(function successCallback(response) {
                authProvider.resetAuth();
                _setStuff(response);
                return response.data;
            }, function errorCallback(response) {
                return $q.reject(response);
            });
        };
        function _register(username, email, password, confirmpassword) {
            var payload = new FormData();
            payload.append("Username", username);
            payload.append("Email", email);
            payload.append("Password", password);
            payload.append("ConfirmPassword", confirmpassword);
            //payload.append(_verification.key, _verification.token);
            var url = apiUrlService.Register();
            return $http.post(url,
                payload,
                {
                    //note that setting Content-Type does not work, doesn't populate payload, leave undefined
                    headers: { 'Content-Type': undefined },
                    //cors cookies will cause options preflight
                    withCredentials: true
                }
            ).then(function successCallback(response) {
                _setStuff(response);
                return response.data;
            }, function errorCallback(response) {
                return $q.reject(response);
            });
        };
        function _forgotPassword(email) {
            var payload = new FormData();
            payload.append("Email", email);
            //payload.append(_verification.key, _verification.token);
            var url = apiUrlService.ForgotPassword();
            return $http.post(url,
                payload,
                {
                    //note that setting Content-Type does not work, doesn't populate payload, leave undefined
                    headers: { 'Content-Type': undefined },
                    //cors cookies will cause options preflight
                    withCredentials: true
                }
            ).then(function successCallback(response) {
                return response.data;
            }, function errorCallback(response) {
                return $q.reject(response);
            });
        };
        function _resetPassword(email, password, confirmpassword, code) {
            var payload = new FormData();
            payload.append("Email", email);
            payload.append("Password", password);
            payload.append("ConfirmPassword", confirmpassword);
            payload.append("Code", code);
            var url = apiUrlService.ResetPassword();
            return $http.post(url,
                payload,
                {
                    //note that setting Content-Type does not work, doesn't populate payload, leave undefined
                    headers: { 'Content-Type': undefined },
                    //cors cookies will cause options preflight
                    withCredentials: true
                }
            ).then(function successCallback(response) {
                _setStuff(response);
                return response.data;
            }, function errorCallback(response) {
                return $q.reject(response);
            });
        };
        function _setPassword(NewPassword, ConfirmPassword) {
            var payload = new FormData();
            payload.append("NewPassword", NewPassword);
            payload.append("ConfirmPassword", ConfirmPassword);
            var url = apiUrlService.SetPassword();
            return $http.post(url,
                payload,
                {
                    //note that setting Content-Type does not work, leave undefined
                    //cors available:: application/x-www-form-urlencoded,multipart/form-data,text/plain
                    headers: { 'Content-Type': undefined },
                    //cors cookies will cause options preflight
                    withCredentials: true
                }
            ).then(function successCallback(response) {
                _setStuff(response);
                return response.data;
            }, function errorCallback(response) {
                return $q.reject(response);
            });
        };
        function _changePassword(OldPassword, NewPassword, ConfirmPassword) {
            var payload = new FormData();
            payload.append("OldPassword", OldPassword);
            payload.append("NewPassword", NewPassword);
            payload.append("ConfirmPassword", ConfirmPassword);
            var url = apiUrlService.ChangePassword();
            return $http.post(url,
                payload,
                {
                    //note that setting Content-Type does not work, leave undefined
                    //cors available:: application/x-www-form-urlencoded,multipart/form-data,text/plain
                    headers: { 'Content-Type': undefined },
                    //cors cookies will cause options preflight
                    withCredentials: true
                }
            ).then(function successCallback(response) {
                _setStuff(response);
                return response.data;
            }, function errorCallback(response) {
                return $q.reject(response);
            });
        };
        function _changeEmail(OldEmail, NewEmail, Password) {
            var payload = new FormData();
            payload.append("Password", Password);
            payload.append("OldEmail", OldEmail);
            payload.append("NewEmail", NewEmail);
            var url = apiUrlService.ChangeEmail();
            return $http.post(url,
                payload,
                {
                    //note that setting Content-Type does not work, leave undefined
                    //cors available:: application/x-www-form-urlencoded,multipart/form-data,text/plain
                    headers: { 'Content-Type': undefined },
                    //cors cookies will cause options preflight
                    withCredentials: true
                }
            ).then(function successCallback(response) {
                return response.data;
            }, function errorCallback(response) {
                return $q.reject(response);
            });
        };
        function _getEmail() {
            var payload = new FormData();
            var url = apiUrlService.GetEmail();
            return $http.post(url,
                payload,
                {
                    //note that setting Content-Type does not work, leave undefined
                    //cors available:: application/x-www-form-urlencoded,multipart/form-data,text/plain
                    headers: { 'Content-Type': undefined }, withCredentials: true
                }
            ).then(function successCallback(response) {
                _setStuff(response);
                return response.data;
            }, function errorCallback(response) {
                return $q.reject(response);
            });
        };
        function _confirmEmail(email, code) {
            var payload = new FormData();
            payload.append("Email", email);
            payload.append("Code", code);
            var url = apiUrlService.ConfirmEmail();
            return $http.post(url,
                payload,
                {
                    //note that setting Content-Type does not work, leave undefined
                    //cors available:: application/x-www-form-urlencoded,multipart/form-data,text/plain
                    headers: { 'Content-Type': undefined },
                    withCredentials: true
                }
            ).then(function successCallback(response) {
                return response.data;
            }, function errorCallback(response) {
                return $q.reject(response);
            });
        };
        function _generateEmailConfirmationToken() {
            var payload = new FormData();
            var url = apiUrlService.GenerateEmailConfirmationToken();
            return $http.post(url,
                payload,
                {
                    //note that setting Content-Type does not work, leave undefined
                    //cors available:: application/x-www-form-urlencoded,multipart/form-data,text/plain
                    headers: { 'Content-Type': undefined },
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