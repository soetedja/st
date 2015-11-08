var app = angular.module("app", ["angular-loading-bar", "ngRoute", "ui.bootstrap", "ngAnimate", "ngTable", "saleStockModule", "starWarsModule"]);
app.config(['$routeProvider', '$modalProvider', 'cfpLoadingBarProvider',
    function($routeProvider, $modalProvider, cfpLoadingBarProvider) {
        $routeProvider.otherwise({
            redirectTo: "/notFound"
        });
        $modalProvider.options.animation = false;
        cfpLoadingBarProvider.latencyThreshold = 0;
    }
]);
app.run(function(baseCommon) {
    baseCommon.appInit();
});