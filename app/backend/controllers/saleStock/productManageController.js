saleStockModule.controller('productManageController', productManageController);

function productManageController($scope, $timeout, $modal, baseCommon, productService, ngTableParams) {
    baseCommon.clearMessages();
    // set timeout for waiting resource to be ready
    baseCommon.setTitle("Products")

    baseCommon.clearErrorMessages();
    $scope.tableParams = new ngTableParams({
        page: 1, // show first page
        count: 10, // count per page
        sorting: {
            name: 'asc' // initial sorting
        }
    }, {
        total: 0, // length of data
        getData: function($defer, params) {
            productService.search(params.filter(), params.count(), params.sorting(), params.page())
                .then(function(result) {
                    $timeout(
                        function() {
                            params.total(result.content.model.total_items);
                            $defer.resolve(result.content.model.items);
                        }, 0);
                }, function(error) {
                    baseCommon.pushMessages(error.content.messages);
                });
        }
    });

    $scope.animationsEnabled = true;

    $scope.delete = function($id, $name) {
        var modalInstance = $modal.open({
            animation: $scope.animationsEnabled,
            template: '<div class="modal-header"><h3 class="modal-title"><i class="icon fa fa-warning"></i> ' + $scope.CommonResources.DeleteConfirmation + '</div>' + '<div class="modal-body"> ' + $scope.CommonResources.Msg_DeleteConfirmation.format($scope.CommonResources.Product.toLowerCase(), $name) + '</div> ' + '<div class = "modal-footer" >' + '<button class = "btn btn-primary" ng-click = "ok()" > OK </button> ' + '<button class = "btn btn-default" ng-click = "cancel()" > Cancel </button> </div>',
            controller: 'productDeleteConfirmationCtrl',
            size: 'md',
            resolve: {
                id: function() {
                    return $id;
                }
            }
        });

        modalInstance.result.then(function(result) {
            $scope.tableParams.reload();
        }, function() {}).finally(function() {
            baseCommon.forceCloseModal();
        });
    };

    $scope.toggleAnimation = function() {
        $scope.animationsEnabled = !$scope.animationsEnabled;
    };
}

saleStockModule.controller('productDeleteConfirmationCtrl', productDeleteConfirmationCtrl);

function productDeleteConfirmationCtrl($scope, $modalInstance, id, productService, baseCommon,constants) {
    $scope.ok = function() {
        productService.delete(id).then(function(result) {
            baseCommon.pushMessages(result.content.messages);
        }, function(result) {
            baseCommon.pushMessages(result.content.messages);
        }).finally(function() {
            $modalInstance.close(id);
        });

    };

    $scope.cancel = function() {
        $modalInstance.dismiss('cancel');
    };
}
