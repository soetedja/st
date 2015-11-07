app.directive('messagesContainer', function() {
    return {
        template: '<div class="row messages-container">' + '<div ng-repeat="message in messages" class="col-md-12 messages">' + '<div class="alert alert-{{message.type}} alert-dismissable">' + '<button type="button" ng-click="messages.splice($index,1)" class="close" data-dismiss="alert" aria-hidden="true">×</button>' + '<i class="icon fa fa-{{message.icon}}"></i> {{message.message}}' + '</div>' + '</div>' + '</div>'
    };
});
app.directive('statusLabel', function($rootScope, $compile, constants) {
    var linker = function(scope, element, attrs) {
        var active = '<span class="label label-success">' + $rootScope.ConfigurationResources.Active + '</span>';
        var inactive = '<span class="label label-danger">' + $rootScope.ConfigurationResources.Inactive + '</span>';
        var pending = '<span class="label label-warning">' + $rootScope.ConfigurationResources.Pending + '</span>';
        var review = '<span class="label label-default">' + $rootScope.ConfigurationResources.Review + '</span>';
        var getTemplate = function(value) {
            var template = '';
            switch (value) {
                case constants.status.active:
                    template = active;
                    break;
                case constants.status.inactive:
                    template = inactive;
                    break;
                case constants.status.pending:
                    template = pending;
                    break;
                case constants.status.review:
                    template = review;
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
app.directive("statusDropdown", function($timeout, $rootScope, $compile, resourceService, statusService) {
    var linker = function(scope, element, attrs) {
        statusService.getAll().then(function(statusResult) {
            angular.forEach(statusResult.content.model, function(value, key) {
                value.name = $rootScope.ConfigurationResources[value.name] === undefined ? value.name : $rootScope.ConfigurationResources[value.name];
            });
            resourceService.commonResource().then(function(result) {
                var template = '<select ng-init="ngModel = ngModel" name="' + scope.name + '" id="' + name + '" class="form-control"';
                template += 'ng-model="ngModel" ng-required=' + scope.required + '>';
                angular.forEach(statusResult.content.model, function(value, key) {
                    template += '<option value="' + value.id + '" >' + value.name + '</option>'
                });
                template += '</select>';
                element.html(template).show();
                $compile(element.contents())(scope);
            }, function(error) {
                baseCommon.pushMessages(error.content.messages);
            });
        }, function() {
            console.log("Error Happened");
        });
        $timeout(function() {}, 100);
    };
    return {
        restrict: 'E',
        link: linker,
        scope: {
            value: '=value',
            ngModel: '=ngModel',
            name: '@name',
            required: '@required'
        }
    };
});
app.directive("languageDropdown", function($timeout, $rootScope, $compile, resourceService, languageService) {
    var linker = function(scope, element, attrs, form) {
        languageService.getAll().then(function(resultLang) {
            angular.forEach(resultLang.content.model, function(value, key) {
                value.name = $rootScope.DictionaryResources[value.name] === undefined ? value.name : $rootScope.DictionaryResources[value.name];
            });
            resourceService.dictionaryResource().then(function(result) {
                var template = '<select ng-init="ngModel = ngModel" name="' + scope.name + '" id="' + name + '" class="form-control"';
                template += 'ng-model="ngModel" ng-required=' + scope.required + '>';
                angular.forEach(resultLang.content.model, function(value, key) {
                    template += '<option value="' + value.id + '" >' + value.name + '</option>'
                });
                template += '</select>';
                element.html(template).show();
                $compile(element.contents())(scope);
            }, function(error) {
                baseCommon.pushMessages(error.content.messages);
            });
        }, function() {
            console.log("Error Happened");
        });
    };
    return {
        restrict: 'E',
        link: linker,
        scope: {
            value: '=value',
            ngModel: '=ngModel',
            name: '@name',
            required: '@required'
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