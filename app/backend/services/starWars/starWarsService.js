app.service('starWarsService', function($http, $q, config) {
    var _swapiPeople = "http://swapi.co/api/people";
    var starWarsService = {
        getList: _getList,
        getDetail: _getDetail,
        debug: _debug
    };
    return starWarsService;

    function _getList($url) {
        var defer = $q.defer();
        $http({
            method: 'GET',
            url: $url
        }).success(function(data) {
            defer.resolve(data);
        }).error(function(data) {
            defer.reject(data);
        });
        return defer.promise;
    }

    function _getDetail($url) {
        var defer = $q.defer();
        $http({
            method: 'GET',
            url: $url
        }).success(function(data) {
            defer.resolve(data);
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