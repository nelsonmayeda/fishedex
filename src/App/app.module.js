//main app module and routing module
(function () {
    'use strict';
    //main ng-app module
    var app = angular.module('app', [
        'env',
        'app.routing',
        'app.component'
    ]);
    //DEBUG_INFO_ENABLED from env module. Setting is different for dev/prod
    //Comment directives and css class directives always disabled
    app.config(['$compileProvider', 'DEBUG_INFO_ENABLED', function ($compileProvider, DEBUG_INFO_ENABLED) {
        $compileProvider.commentDirectivesEnabled(false);//not using restrict M <!--directive:book -->
        $compileProvider.cssClassDirectivesEnabled(false);//not using restrict C <div class="book"></div>
        $compileProvider.debugInfoEnabled(DEBUG_INFO_ENABLED);//remove debug comments on DOM elements
    }]);
    //NOTE: app.run is used in the html templateCache bundle
    //once in cache, uirouter automatically uses $templateCache
    //no need to force using state config
    //            templateProvider: function ($templateCache) {
    //                return $templateCache.get('/App/Lists/FishEDex.html');
    //            },
    var routing = angular.module('app.routing', [
        'ui.router',
        'account', 'fish', 'home', 'lists', 'species'
    ]);
    routing.config(['$stateProvider', '$locationProvider', '$urlMatcherFactoryProvider', '$sceDelegateProvider', 'WHITELIST', function ($stateProvider, $locationProvider, $urlMatcherFactoryProvider, $sceDelegateProvider, WHITELIST) {
        $sceDelegateProvider.resourceUrlWhitelist(WHITELIST);
        $locationProvider.html5Mode(true);//no hash urls
        $urlMatcherFactoryProvider.caseInsensitive(true);
        $urlMatcherFactoryProvider.strictMode(false);//no trailing slash
        $stateProvider
            .state('app', {
                abstract: true,
                views: {
                    'pageheader': {
                        templateUrl: '/App/Shared/Header/navbar.html',
                        controller: 'headerController',
                        controllerAs: 'vm'
                    },
                    'pagefooter': {
                        templateUrl: '/App/Shared/Footer/footer.html',
                        controller: 'footerController',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('app.home', {
                abstract: true
            })
            .state('app.home.Fishedex', {
                url: '/',
                views: {
                    '@': {
                        templateUrl: '/App/Lists/FishEDex.html',
                        controller: 'fishedexController',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('app.home.About', {
                url: '/About',
                views: {
                    '@': {
                        templateUrl: '/App/Home/About.html',
                        controller: 'aboutController',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('app.home.Contact', {
                url: '/Contact',
                views: {
                    '@': {
                        templateUrl: '/App/Home/Contact.html',
                        controller: 'contactController',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('app.home.Privacy', {
                url: '/Privacy',
                views: {
                    '@': {
                        templateUrl: '/App/Home/Privacy.html',
                        controller: 'privacyController',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('app.ListIndex', {
                url: '/Lists?{after}&{take}',
                reloadOnSearch: false,
                views: {
                    '@': {
                        templateUrl: '/App/Lists/ListIndex.html',
                        controller: 'listsIndexController',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('app.ListCreate', {
                url: '/Lists/Create',
                views: {
                    '@': {
                        templateUrl: '/App/Lists/ListCreate.html',
                        controller: 'listsCreateController',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('app.ListDetails', {
                url: '/Lists/{categoryId}',
                views: {
                    '@': {
                        templateUrl: '/App/Lists/ListDetails.html',
                        controller: 'listsDetailsController',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('app.ListEdit', {
                url: '/Lists/{categoryId}/Edit',
                views: {
                    '@': {
                        templateUrl: '/App/Lists/ListEdit.html',
                        controller: 'listsEditController',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('app.ListDelete', {
                url: '/Lists/{categoryId}/Delete',
                views: {
                    '@': {
                        templateUrl: '/App/Lists/ListDelete.html',
                        controller: 'listsDeleteController',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('app.ListFishedex', {
                url: '/Lists/{categoryId}/FishEDex',
                views: {
                    '@': {
                        templateUrl: '/App/Lists/FishEDex.html',
                        controller: 'fishedexController',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('app.ListLeaderboard', {
                url: '/Lists/{categoryId}/Leaderboard?{after}&{take}',
                reloadOnSearch: false,
                views: {
                    '@': {
                        templateUrl: '/App/Lists/Leaderboard.html',
                        controller: 'listsLeaderboardController',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('app.SpeciesCreate', {
                url: '/Lists/{categoryId}/SpeciesCreate',
                views: {
                    '@': {
                        templateUrl: '/App/Species/SpeciesCreate.html',
                        controller: 'speciesCreateController',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('app.SpeciesDetails', {
                url: '/Species/{speciesId}?{after}&{take}',
                reloadOnSearch: false,
                views: {
                    '@': {
                        templateUrl: '/App/Species/SpeciesDetails.html',
                        controller: 'speciesDetailsController',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('app.SpeciesEdit', {
                url: '/Species/{speciesId}/Edit',
                views: {
                    '@': {
                        templateUrl: '/App/Species/SpeciesEdit.html',
                        controller: 'speciesEditController',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('app.SpeciesDelete', {
                url: '/Species/{speciesId}/Delete',
                views: {
                    '@': {
                        templateUrl: '/App/Species/SpeciesDelete.html',
                        controller: 'speciesDeleteController',
                        controllerAs: 'vm'
                    }
                }
            })
            //don't move fishSearch below fishDetails or routing won't work properly
            .state('app.FishSearch', {
                url: '/Fish/Search?{Title}&{User}&{List}&{after}&{take}',
                reloadOnSearch: false,
                views: {
                    '@': {
                        templateUrl: '/App/Fish/FishIndex.html',
                        controller: 'fishSearchController',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('app.FishCreate', {
                url: '/Fish/Create',
                views: {
                    '@': {
                        templateUrl: '/App/Fish/FishCreate.html',
                        controller: 'fishCreateController',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('app.FishUpload', {
                url: '/Fish/Upload',
                views: {
                    '@': {
                        templateUrl: '/App/Fish/FishCreate.html',
                        controller: 'fishUploadController',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('app.FishIndex', {
                url: '/Fish?{after}&{take}',
                reloadOnSearch: false,
                views: {
                    '@': {
                        templateUrl: '/App/Fish/FishIndex.html',
                        controller: 'fishIndexController',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('app.FishDetails', {
                url: '/Fish/{fishId}',
                views: {
                    '@': {
                        templateUrl: '/App/Fish/FishDetails.html',
                        controller: 'fishDetailsController',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('app.FishEdit', {
                url: '/Fish/{fishId}/Edit',
                views: {
                    '@': {
                        templateUrl: '/App/Fish/FishEdit.html',
                        controller: 'fishEditController',
                        controllerAs: 'vm'
                    }
                }
            })
            .state('app.FishDelete', {
                url: '/Fish/{fishId}/Delete',
                views: {
                    '@': {
                        templateUrl: '/App/Fish/FishDelete.html',
                        controller: 'fishDeleteController',
                        controllerAs: 'vm'
                    }
                }
            })
            .state("app.AccountManage", {
                url: "/Account",
                views: {
                    '@': {
                        templateUrl: '/App/Account/ManageIndex.html',
                        controller: 'manageIndexController',
                        controllerAs: 'vm'
                    }
                }
            })
            .state("app.AccountRegister", {
                url: "/Account/Register",
                views: {
                    '@': {
                        templateUrl: '/App/Account/Register.html',
                        controller: 'registerController',
                        controllerAs: 'vm'
                    }
                }
            })
            .state("app.AccountLogin", {
                url: "/Account/Login?{ReturnUrl}",
                views: {
                    '@': {
                        templateUrl: '/App/Account/Login.html',
                        controller: 'loginController',
                        controllerAs: 'vm'
                    }
                }
            })
            .state("app.AccountLogout", {
                url: "/Account/LogOut",
                views: {
                    '@': {
                        templateUrl: '/App/Account/Logout.html',
                        controller: 'logoutController',
                        controllerAs: 'vm'
                    }
                }
            })
            .state("app.ForgotPassword", {
                url: "/Account/ForgotPassword",
                views: {
                    '@': {
                        templateUrl: '/App/Account/ForgotPassword.html',
                        controller: 'forgotPasswordController',
                        controllerAs: 'vm'
                    }
                }
            })
            .state("app.ResetPassword", {
                url: "/Account/ResetPassword?{Email}&{Code}",
                views: {
                    '@': {
                        templateUrl: '/App/Account/ResetPassword.html',
                        controller: 'resetPasswordController',
                        controllerAs: 'vm'
                    }
                }
            })
            .state("app.ChangePassword", {
                url: "/Account/ChangePassword",
                views: {
                    '@': {
                        templateUrl: '/App/Account/ChangePassword.html',
                        controller: 'changePasswordController',
                        controllerAs: 'vm'
                    }
                }
            })
            .state("app.ConfirmEmail", {
                url: "/Account/ConfirmEmail?{Email}&{Code}",
                views: {
                    '@': {
                        templateUrl: '/App/Account/ConfirmEmail.html',
                        controller: 'confirmEmailController',
                        controllerAs: 'vm'
                    }
                }
            })
            .state("app.ChangeEmail", {
                url: "/Account/ChangeEmail",
                views: {
                    '@': {
                        templateUrl: '/App/Account/ChangeEmail.html',
                        controller: 'changeEmailController',
                        controllerAs: 'vm'
                    }
                }
            })
            //leave this at the end just in case of pattern matching conflicts
            .state('app.NotFound', {
                url: '/*path',
                views: {
                    '@': {
                        templateUrl: '/App/Home/404.html',
                        controller: 'notFoundController',
                        controllerAs: 'vm'
                    }
                }
            });
    }]);
})();