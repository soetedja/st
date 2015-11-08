starWarsModule.controller('peopleDetailController', peopleDetailController);

function peopleDetailController($scope, $routeParams, $location, baseCommon, starWarsService) {
    //list handled in directive, look at loadMore directive in commonDirective.js
    $scope.id = $routeParams.id;
}