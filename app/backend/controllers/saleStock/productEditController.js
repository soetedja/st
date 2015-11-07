saleStockModule.controller('productEditController', productEditController);

function productEditController($scope, $routeParams, $location, baseCommon, productService) {
    baseCommon.clearMessages();
    productService.getById($routeParams.id).then(function(result) {
        $scope.entity = result.content.model;
    }, function(error) {
        baseCommon.pushMessages(error.content.messages);
        $scope.disabled = true;
    });
    $scope.submitForm = function(isValid) {
        $scope.formData = $scope.formTest;
        if (isValid) {
            productService.update($scope.entity).then(function(result) {
                baseCommon.pushMessages(result.content.messages);
                $location.path($scope.navigation.saleStock.subs.products.url);
            }, function(error) {
                baseCommon.pushMessages(error.content.messages);
            }).
            finally(function() {});
        }
    };
}