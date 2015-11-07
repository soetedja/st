app.service('baseService', function($http, $q, config) {
    var baseService = {
        search: _search,
        getById: _getById,
        getAll : _getAll,
        create: _create,
        update: _update,
        delete: _delete,
        debug: _debug,
    };
    return baseService;

    function _getAll() {
        var defer = $q.defer();
        $http({
            method: 'GET',
            url: config.base_api_url + this.getApi()
        }).success(function(data) {
            defer.resolve(data);
        }).error(function(data) {
            defer.reject(data);
        });
        return defer.promise;
    }

    function _search($filter, $count, $sorting, $page) {
        var defer = $q.defer();
        $http({
            method: 'POST',
            url: config.base_api_url + this.getApi() + "search",
            data: $.param({
                filter: $filter,
                count: $count,
                sorting: $sorting,
                page: $page
            }),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).success(function(data) {
            if (data.content === undefined) {
                _debug(data);
                defer.reject(data);
            } else {
                defer.resolve(data);
            }
        }).error(function(data) {
            defer.reject(data);
        });
        return defer.promise;
    }

    function _getById($id) {
        var defer = $q.defer();
        $http({
            method: 'GET',
            url: config.base_api_url + this.getApi() + $id
        }).success(function(data) {
            if (data.content === undefined) {
                _debug(data);
                defer.reject(data);
            } else {
                defer.resolve(data);
            }
        }).error(function(error) {
            defer.reject(error);
        });
        return defer.promise;
    }

    function _create($entity) {
        var defer = $q.defer();
        $http({
            method: 'POST',
            url: config.base_api_url + this.getApi() + "create",
            data: $.param($entity),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).success(function(data) {
            if (data.content === undefined) {
                _debug(data);
                defer.reject(data);
            } else {
                defer.resolve(data);
            }
        }).error(function(data) {
            defer.reject(data);
        });
        return defer.promise;
    }

    function _update($entity) {
        var defer = $q.defer();
        $http({
            method: 'POST',
            url: config.base_api_url + this.getApi() + "update",
            data: $.param($entity),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }).success(function(data) {
            if (data.content === undefined) {
                _debug(data);
                defer.reject(data);
            }
            defer.resolve(data);
        }).error(function(data) {
            defer.reject(data);
        });
        return defer.promise;
    }

    function _delete($id) {
        var defer = $q.defer();
        $http({
            method: 'DELETE',
            url: config.base_api_url + this.getApi() + $id
        }).success(function(data) {
            console.log(data);
            if (data.content === undefined) {
                _debug(data);
                defer.reject(data);
            } else {
                defer.resolve(data);
            }
        }).error(function(data) {
            defer.reject(data);
        });
        return defer.promise;
    }

    function _debug($error) {
        toastr.options = {
            "closeButton": true,
            "debug": false,
            "newestOnTop": false,
            "progressBar": true,
            "positionClass": "toast-bottom-full-width",
            "preventDuplicates": false,
            "onclick": null,
            "showDuration": "300",
            "hideDuration": "1000",
            "timeOut": 0,
            "extendedTimeOut": 0,
            "showEasing": "swing",
            "hideEasing": "linear",
            "showMethod": "fadeIn",
            "hideMethod": "fadeOut",
            "tapToDismiss": false
        };
        toastr.error($error);
    }
});