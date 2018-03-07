(function () {
    var app = angular.module('env', []);
    app.constant('URL_BASE', 'http://localhost:59686/api/');
    app.constant('WIKI_BASE', 'http://localhost:59686/api/Wiki');
    app.constant('DEBUG_INFO_ENABLED', true);
    app.constant('WHITELIST', ['**']);
})();