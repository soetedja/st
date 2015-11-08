app.directive("loadMore", function($timeout, $rootScope, $compile, starWarsService) {
    var linker = function(scope, element, attrs, form) {
        scope.ngModel = scope.ngModel === undefined ? [] : scope.ngModel;
        var loadMore = function() {
            $rootScope.loadMoreLoading = true;
            starWarsService.getList(scope.url).then(function(result) {
                $rootScope.loadMoreLoading = false;
                scope.url = result.next;
                angular.forEach(result.results, function(value, key) {
                    var split = value.url.split("/");
                    value.id = split[split.length - 2];
                    scope.ngModel.push(value);
                });
            }, function() {
                console.log("Error Happened");
            });
        };
        if ($(window).height() > $(document).height() - 100) {
            loadMore();
        }
        $(window).scroll(function() {
            if (($(window).scrollTop() + $(window).height() > $(document).height() - 500) && scope.url != null) {
                loadMore();
            }
        });
        loadMore();
    };
    return {
        restrict: 'EA',
        link: linker,
        scope: {
            ngModel: '=ngModel',
            url: '@url',
        }
    };
});
app.directive("getDetail", function($timeout, $rootScope, $compile, starWarsService) {
    var linker = function(scope, element, attrs, form) {
            starWarsService.getDetail(scope.url).then(function(result) {
                var split = result.url.split("/");
                result.id = split[split.length - 2];
                scope.ngModel = result;
            }, function() {
                console.log("Error Happened");
            });
    };
    return {
        restrict: 'EA',
        link: linker,
        scope: {
            ngModel: '=ngModel',
            url: '@url',
        }
    };
});
app.directive('booleanLabel', function($rootScope, $compile) {
    var linker = function(scope, element, attrs) {
        var yes = '<span class="label label-success">' + $rootScope.CommonResources.Yes + '</span>';
        var no = '<span class="label label-default">' + $rootScope.CommonResources.No + '</span>';
        var getTemplate = function(value) {
            var template = '';
            switch (value) {
                case "1":
                    template = yes;
                    break;
                case "0":
                    template = no;
                    break;
            }
            return template;
        };
        element.html(getTemplate(scope.value)).show();
        $compile(element.contents())(scope);
    };
    return {
        restrict: 'A',
        link: linker,
        scope: {
            value: '=value'
        }
    };
});
