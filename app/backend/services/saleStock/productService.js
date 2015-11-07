saleStockModule.service('productService', productServices);

function productServices($http, $q, config, constants, baseService) {
    var productServices = {
        // login: _login,
        getApi: _getApi,
    };
    productServices = angular.extend(angular.copy(baseService), productServices);
    return productServices;

    function _getApi() {
        return constants.modules.saleStock.product.api;
    }
}