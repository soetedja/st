app.service('resourceService', resourceService);

function resourceService($rootScope, $http, $q, $timeout, config, constants) {
    var resourceService = {
        getAll: _getAll,
        commonResource: _commonResource,
        dictionaryResource: _dictionaryResource,
    }
    return resourceService;

    function _getAll() {
        var defer = $q.defer();
        $http({
            method: 'GET',
            url: config.base_api_url + constants.modules.resources.resource.api
        }).success(function(data) {
            defer.resolve(data);
        }).error(function(data) {
            defer.reject(data);
        });
        return defer.promise;
    }

    function _commonResource() {
        var defer = $q.defer();
        $timeout(function() {
            defer.resolve($rootScope.CommonResources);
        }, 0);
        return defer.promise;
    }

    function _dictionaryResource() {
        var defer = $q.defer();
        $timeout(function() {
            defer.resolve($rootScope.DictionaryResources);
        }, 0);
        return defer.promise;
    }
}