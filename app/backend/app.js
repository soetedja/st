var app = angular.module("app", ["angular-loading-bar", "ngRoute", "ui.bootstrap", "ngAnimate", "ngTable", "saleStockModule"]);
app.config(['$routeProvider', '$modalProvider', 'cfpLoadingBarProvider',
    function($routeProvider, $modalProvider, cfpLoadingBarProvider) {
        $routeProvider.when("/login", {
            templateUrl: "app/backend/views/configurations/login.html",
            controller: "loginController"
        }).otherwise({
            redirectTo: "/saleStock/products"
        });
        $modalProvider.options.animation = false;
        cfpLoadingBarProvider.latencyThreshold = 0;
    }
]);
app.run(function(baseCommon) {
    baseCommon.appInit();
});