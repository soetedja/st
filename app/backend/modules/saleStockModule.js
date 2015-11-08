var saleStockModule = angular.module('saleStockModule', []);

saleStockModule.config(function($routeProvider) {
    $routeProvider.when("/saleStock/products", {
            templateUrl: "app/backend/views/saleStock/product-manage.html",
            controller: "productManageController"
        })
        .when('/saleStock/product/create', {
            templateUrl: 'app/backend/views/saleStock/product-create.html',
            controller: 'productCreateController'
        })
        .when('/saleStock/product/:id', {
            templateUrl: 'app/backend/views/saleStock/product-edit.html',
            controller: 'productEditController'
        });
});
