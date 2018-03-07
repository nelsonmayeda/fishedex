(function () {
    'use strict';
    var mod = angular.module('account.controllers', [
        'ui.router',
        'account.services',
        'shared'
    ]);
    mod.controller('loginController', ['$state', '$stateParams', '$location', 'LoadingService', 'accountServices', 'modalService', 'titleService', loginController]);
    mod.controller('logoutController', ['$state', '$location', 'LoadingService', 'accountServices', 'modalService', 'titleService', logoutController]);
    mod.controller('registerController', ['$state', '$location', 'LoadingService', 'accountServices', 'modalService', 'titleService', registerController]);
    mod.controller('forgotPasswordController', [ '$location', 'LoadingService', 'accountServices', 'modalService', 'titleService', forgotPasswordController]);
    mod.controller('resetPasswordController', ['$state', '$stateParams', '$location', 'LoadingService', 'accountServices', 'modalService', 'titleService', resetPasswordController]);

    mod.controller('manageIndexController', ['$state', '$location', 'LoadingService', 'authProvider', 'accountServices',  'modalService', 'titleService', manageIndexController]);
    mod.controller('changeEmailController', ['$location', 'LoadingService', 'authProvider', 'accountServices', 'modalService', 'titleService', changeEmailController]);
    mod.controller('changePasswordController', ['$state', '$location', 'LoadingService', 'authProvider', 'accountServices', 'modalService', 'titleService', changePasswordController]);
    mod.controller('confirmEmailController', [ '$stateParams', '$location', 'LoadingService', 'accountServices', 'modalService', 'titleService', confirmEmailController]);
    function loginController($state, $stateParams, $location, LoadingService, accountServices, modalService, titleService) {
        var vm = this;
        var returnUrl = $stateParams.ReturnUrl;
        titleService.setTitle('Login');

        //public
        vm.Model = {
            Title: "Login",
            Description: "",
            userName: "",
            password: "",
            rememberMe: false
        };
        vm.login = _login;
        vm.redirect = _redirect;
        vm.Loading = LoadingService.State;
        //vm.Loading = {
        //    Active: false,
        //    Error: false,
        //    Message: ""
        //};

        //private
        function _redirect() {
            if (!returnUrl) {
                $location.url('/');
            }
            else {
                $location.url(returnUrl);
            }
        };
        function _login() {
            LoadingService.Start("Loading");
            modalService.open("Logging in");
            accountServices.login(
                vm.Model.userName,
                vm.Model.password,
                vm.Model.rememberMe
                )
                .then(
                    function successCallback(data) {
                        LoadingService.Success("Success");
                        modalService.close();
                        vm.redirect();//note calling vm.redirect instead of _redirect for testing purposes
                    }, function errorCallback(response) {
                        LoadingService.Error(response);
                        modalService.close();
                    }
                );
        };
        return vm;
    };
    function logoutController($state, $location, LoadingService, accountServices, modalService, titleService) {
        var vm = this;
        titleService.setTitle('Logout');

        //public
        vm.Model = {
            Title: "Logout",
            Description: ""
        };
        vm.logout = _logout;
        vm.redirect = _redirect;
        vm.Loading = LoadingService.State;
        //vm.Loading = {
        //    Active: false,
        //    Error: false,
        //    Message: ""
        //};

        //private
        function _redirect() {
            $location.url('/');
        };
        function _logout() {
            LoadingService.Start("Loading");
            modalService.open("Logging out");
            accountServices.logout()
                .then(function successCallback(data) {
                    LoadingService.Success("Success");
                    modalService.close();
                    vm.redirect();//note calling vm.redirect instead of _redirect for testing purposes
                }, function errorCallback(response) {
                    LoadingService.Error(response);
                    modalService.close();
                });
        };
        return vm;
    };
    function registerController($state, $location, LoadingService, accountServices, modalService, titleService) {
        var vm = this;
        titleService.setTitle('Register');

        //public
        vm.Model = {
            Title: "Register",
            Description: "Create a new account",
            userName: "",
            email: "",
            password: "",
            confirmPassword: ""
        };
        vm.register = _register;
        vm.redirect = _redirect;
        vm.Loading = LoadingService.State;
        //vm.Loading = {
        //    Active: false,
        //    Error: false,
        //    Message: ""
        //};

        //private
        function _redirect() {
            $location.url('/');
        };
        function _register() {
            LoadingService.Start("Loading");
            if (vm.Model.password == vm.Model.confirmPassword) {
                modalService.open("Registering");
                accountServices.register(
                    vm.Model.userName,
                    vm.Model.email,
                    vm.Model.password,
                    vm.Model.confirmPassword
                )
                    .then(function successCallback(data) {
                        LoadingService.Success("Success");
                        modalService.close();
                        vm.redirect();//note calling vm.redirect instead of _redirect for testing purposes
                    }, function errorCallback(response) {
                        LoadingService.Error(response);
                        modalService.close();
                    });
            } else {
                LoadingService.Error({ status: "", statusText: "Passwords don't match" });
            }
        };
        return vm;
    };
    function manageIndexController($state, $location, LoadingService, authProvider, accountServices, modalService, titleService) {
        var vm = this;
        titleService.setTitle('Manage');

        //public
        vm.Model = {
            Title: "Manage",
            Description: "",
            EmailConfirmed: false//not really confirmed yet, just hide resend email
        }
        vm.redirect = _redirect;
        vm.Auth = authProvider.authentication;
        vm.logout = _logout;
        vm.generateEmailConfirmationToken = _generateEmailConfirmationToken;
        vm.Loading = LoadingService.State;
        //vm.Loading = {
        //    Active: false,
        //    Error: false,
        //    Message: ""
        //};

        //private
        function _logout() {
            LoadingService.Start("Loading");
            accountServices.logout()
                .then(function successCallback(data) {
                    LoadingService.Success("Success");
                    vm.redirect();//note calling vm.redirect instead of _redirect for testing purposes
                }, function errorCallback(response) {
                    LoadingService.Error(response);
                });
        };
        function _redirect() {
            $location.url('/');
        };
        function _generateEmailConfirmationToken() {
            LoadingService.Start("Loading");
            modalService.open("Sending");
            accountServices.generateEmailConfirmationToken()
                .then(function successCallback(data) {
                    LoadingService.Success("Success");
                    vm.Model.EmailConfirmed = true;//not really confirmed yet, just hide resend email
                    modalService.close();
                }, function errorCallback(response) {
                    LoadingService.Error(response);
                    modalService.close();
                });
        };

        return vm;
    };
    function changePasswordController($state, $location, LoadingService, authProvider, accountServices, modalService, titleService) {
        var vm = this;
        titleService.setTitle('Change Password');

        //public
        vm.Model = {
            Title: "Change Password",
            Description: "Enter your new password",
            OldPassword: "",
            NewPassword: "",
            ConfirmPassword: "",
            Changed:false
        };
        vm.Auth = authProvider.authentication;
        vm.changePassword = _changePassword;
        vm.Loading = LoadingService.State;
        //vm.Loading = {
        //    Active: false,
        //    Error: false,
        //    Message: ""
        //};

        //private
        function _changePassword() {
            LoadingService.Start("Loading");
            if (vm.Model.NewPassword == vm.Model.ConfirmPassword) {
                modalService.open("Changing");
                accountServices.changePassword(
                    vm.Model.OldPassword,
                    vm.Model.NewPassword,
                    vm.Model.ConfirmPassword
                )
                    .then(function successCallback(data) {
                        LoadingService.Success("Success");
                        modalService.close();
                        vm.Model.Changed = true;
                    }, function errorCallback(response) {
                        LoadingService.Error(response);
                        modalService.close();
                    });
            } else {
                LoadingService.Error({ status: "", statusText: "Passwords don't match" });
            }
        };
        return vm;
    };
    function confirmEmailController($stateParams, $location, LoadingService, accountServices, modalService, titleService) {
        var vm = this;
        //note: allowAnonymous
        var email = $stateParams.Email;
        var code = $stateParams.Code;
        titleService.setTitle('Confirm Email');

        //public
        vm.Model = {
            Title: "Confirm Email",
            Description: "Click below to confirm your email",
            Email: email,
            Code: code,
            Confirmed:false
        };
        vm.confirmEmail = _confirmEmail;
        vm.Loading = LoadingService.State;
        //vm.Loading = {
        //    Active: false,
        //    Error: false,
        //    Message: ""
        //};
        function _confirmEmail() {
            LoadingService.Start("Loading");
            modalService.open("Confirming");
            accountServices.confirmEmail(
                email,
                code
            )
                .then(function successCallback(data) {
                    LoadingService.Success("Success");
                    modalService.close();
                    vm.Model.Confirmed = true;
                }, function errorCallback(response) {
                    LoadingService.Error(response);
                    modalService.close();
                });
        };
        return vm;
    };
    function changeEmailController($location, LoadingService, authProvider, accountServices, modalService, titleService) {
        var vm = this;
        titleService.setTitle('Change Email');

        //public
        vm.Model = {
            Title: "Change Email",
            Description: "A new confirmation link will be sent",
            NewEmail: "",
            Password: "",
            Changed: false
        };
        vm.changeEmail = _changeEmail;
        vm.Loading = LoadingService.State;
        vm.Auth = authProvider.authentication;
        //vm.Loading = {
        //    Active: false,
        //    Error: false,
        //    Message: ""
        //};

        //private
        function _changeEmail() {
            LoadingService.Start("Loading");
            accountServices.changeEmail(
                vm.Auth.email,
                vm.Model.NewEmail,
                vm.Model.Password
            )
                .then(function successCallback(data) {
                    LoadingService.Success("Success");
                    vm.Model.Changed = true;
                }, function errorCallback(response) {
                    LoadingService.Error(response);
                });
        };
        return vm;
    };
    function forgotPasswordController($location, LoadingService, accountServices, modalService, titleService) {
        var vm = this;
        titleService.setTitle('Forgot Password');

        //public
        vm.Model = {
            Title: "Forgot Password",
            Description: "Send a reset password link to your email.",
            email: "",
            Sent: false
        };
        vm.forgotPassword = _forgotPassword;
        vm.Loading = LoadingService.State;
        //vm.Loading = {
        //    Active: false,
        //    Error: false,
        //    Message: ""
        //};

        //private
        function _forgotPassword() {
            LoadingService.Start("Loading");
            modalService.open("Sending");
            accountServices.forgotPassword(vm.Model.email)
                .then(function successCallback(data) {
                    LoadingService.Success("Success");
                    modalService.close();
                    vm.Model.Sent = true;
                }, function errorCallback(response) {
                    LoadingService.Error(response);
                    modalService.close();
                });
        };
        return vm;
    };
    function resetPasswordController($state, $stateParams, $location, LoadingService, accountServices, modalService, titleService) {
        var vm = this;
        var email = $stateParams.Email;
        var code = $stateParams.Code;
        titleService.setTitle('Reset Password');

        //public
        vm.Model = {
            Title: "Reset Password",
            Description: "Enter your new password",
            email: email,
            password: "",
            confirmPassword: "",
            Changed: false
        };
        vm.resetPassword = _resetPassword;
        vm.Loading = LoadingService.State;
        //vm.Loading = {
        //    Active: false,
        //    Error: false,
        //    Message: ""
        //};

        //private
        function _resetPassword() {
            LoadingService.Start("Loading");
            if (vm.Model.password == vm.Model.confirmPassword) {
                modalService.open("Reseting");
                accountServices.resetPassword(
                    vm.Model.email,
                    vm.Model.password,
                    vm.Model.confirmPassword,
                    code
                )
                    .then(function successCallback(data) {
                        LoadingService.Success("Success");
                        modalService.close();
                        vm.Model.Changed = true;
                    }, function errorCallback(response) {
                        LoadingService.Error(response);
                        modalService.close();
                    });
            } else {
                LoadingService.Error({ status: "", statusText: "Passwords don't match" });
            }
        };

        return vm;
    };
})();