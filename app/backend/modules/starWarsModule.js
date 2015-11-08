var starWarsModule = angular.module('starWarsModule', []);

starWarsModule.config(function($routeProvider) {
    $routeProvider
        .when("/starWars/people", {
            templateUrl: "app/backend/views/starWars/people-list.html",
            controller: "peopleListController"
        })
        .when('/starWars/people/:id', {
            templateUrl: 'app/backend/views/starWars/people-detail.html',
            controller: 'peopleDetailController'
        });
});
