(function () {
    var app = angular.module('env', []);
    app.constant('URL_BASE', '//fishedex.azurewebsites.net/api/');
    app.constant('WIKI_BASE', 'https://en.wikipedia.org/w/api.php');
    app.constant('DEBUG_INFO_ENABLED', false);
    app.constant('WHITELIST', [
        'self',
        '//fishedex.azurewebsites.net/api/**',
        'https://en.wikipedia.org/w/api.php**'
    ]);
})();