saleStockModule.controller('productCreateController', productCreateController);

function productCreateController($scope, $location, baseCommon, productService) {
    baseCommon.clearMessages();
    $scope.submitForm = function(isValid) {
        if (isValid) {
            productService.create($scope.entity).then(function(result) {
                baseCommon.pushMessages(result.content.messages);
                $location.path($scope.navigation.saleStock.subs.products.url);
            }, function(error) {
                baseCommon.pushMessages(error.content.messages);
            }).finally(function() {});
        }
    };
}