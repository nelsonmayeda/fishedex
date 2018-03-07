(function () {
    'use strict';
    var mod = angular.module('shared');
    mod.factory('apiUrlService', ['URL_BASE', 'WIKI_BASE', apiUrlService]);
    mod.factory('titleService', ['$window', titleService]);
    //change window.document.title
    function titleService($window) {
        return {
            setTitle: function (title) {
                //order matters. replacestate first then change title
                $window.history.replaceState(null, '');
                $window.document.title = title;
            }
        };
    };
    //provides backend api urls for all http services
    //NOTE: frontend routes in app.routing
    function apiUrlService(URL_BASE, WIKI_BASE) {
        return {
            AntiForgeryToken: function () {
                return URL_BASE + "AntiForgeryToken";
            },
            FishEDex: function () {
                //note: categoryId passed as parameter
                return URL_BASE + "Lists/FishEDexJSON";
            },
            Leaderboard: function (id) {
                //note: after,take passed as parameter
                return URL_BASE + "Lists/" + id + "/LeaderboardJSON";
            },
            ListsIndex: function () {
                //note: after,take passed as parameter
                return URL_BASE + "Lists/IndexJSON";
            },
            ListCreate: function () {
                //note: title,description,file,auth passed as payload
                return URL_BASE + "Lists/Create";
            },
            ListDetails: function (id) {
                //TODO:note: after,take passed as parameter
                return URL_BASE + "Lists/" + id + "/DetailsJSON";
            },
            ListEdit: function (id) {
                //note: title,description,file,auth passed as payload
                return URL_BASE + "Lists/" + id + "/Edit";
            },
            ListDelete: function (id) {
                return URL_BASE + "Lists/" + id + "/Delete";
            },
            FishIndex: function () {
                //note: after,take passed as parameter
                return URL_BASE + "Fish/IndexJSON";
            },
            FishCreate: function () {
                //note: title,description,file,auth passed as payload
                return URL_BASE + "Fish/Create";
            },
            FishDetails: function (id) {
                return URL_BASE + "Fish/" + id + "/DetailsJSON";
            },
            FishEdit: function (id, title, description, file) {
                //note: title,description,file,auth passed as payload
                return URL_BASE + "Fish/" + id + "/Edit";
            },
            FishDelete: function (id) {
                //note: auth passed as payload
                return URL_BASE + "Fish/" + id + "/Delete";
            },
            FishUpload: function (files) {
                //note: files,auth passed as payload
                return URL_BASE + "Fish/Upload";
            },
            FishSearch: function () {
                //note: after, take, list, title, user passed as parameter
                return URL_BASE + "Fish/SearchJSON";
            },
            SpeciesCreate: function (id) {
                //note: title,description,file,auth passed as payload
                return URL_BASE + "Lists/" + id + "/SpeciesCreate";
            },
            SpeciesDetails: function (id) {
                //note: after,take passed as parameter
                return URL_BASE + "Species/" + id + "/DetailsJSON";
            },
            SpeciesEdit: function (id, title, description, file) {
                //note: title,description,file,auth passed as payload
                return URL_BASE + "Species/" + id + "/Edit";
            },
            SpeciesDelete: function (id) {
                //note: auth passed as payload
                return URL_BASE + "Species/" + id + "/Delete";
            },
            Authenticate: function () {
                return URL_BASE + "Account/Authenticate";
            },
            Login: function () {
                return URL_BASE + "Account/Login";
            },
            Register: function () {
                return URL_BASE + "Account/Register";
            },
            LogOut: function () {
                return URL_BASE + "Account/LogOut";
            },
            ForgotPassword: function () {
                return URL_BASE + "Account/ForgotPassword";
            },
            ResetPassword: function () {
                return URL_BASE + "Account/ResetPassword";
            },
            ChangePassword: function () {
                return URL_BASE + "Account/ChangePassword";
            },
            ChangeEmail: function () {
                return URL_BASE + "Account/ChangeEmail";
            },
            GetEmail: function () {
                return URL_BASE + "Account/GetEmail";
            },
            ConfirmEmail: function () {
                return URL_BASE + "Account/ConfirmEmail";
            },
            GenerateEmailConfirmationToken: function () {
                return URL_BASE + "Account/GenerateEmailConfirmationToken";
            },
            Wiki: function (title) {
                return WIKI_BASE + "?format=json&action=query&redirects&titles=" + encodeURI(title) + "&prop=pageimages|extracts|info&pithumbsize=400&exintro&explaintext&exsentences=2&inprop=url";
            }
        };
    };
})();