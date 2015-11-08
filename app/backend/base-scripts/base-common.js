app.factory('baseCommon', baseCommon);

function baseCommon($q, $rootScope, $document, $window, $timeout, constants, resourceService) {
    $rootScope.messageIsViewed = true;
    $rootScope.messages = [];
    var baseCommon = {
        appInit: _appInit,
        clearErrorMessages: _clearErrorMessages,
        clearMessages: _clearMessages,
        forceCloseModal: _forceCloseModal,
        pushMessages: _pushMessages,
        setTitle: _setTitle,
    };
    return baseCommon;

    function _appInit() {
        _populateResources();
        $rootScope.navigation = _getNavigation();
        $rootScope.booleanDropdownOptions = _getBooleanDropdownOptions();
        $rootScope.sitebarAction = _sitebarAction;
        $rootScope.getBooleanFilterOptions = _getBooleanFilterOptions;
        $rootScope.getLanguageFilterOptions = _getLanguageFilterOptions;
    }

    function _getBooleanFilterOptions() {
        var options = [];
        _commonResource().then(function(result) {
            options.push({
                id: "",
                title: $rootScope.CommonResources.All
            });
            options.push({
                id: "1",
                title: $rootScope.CommonResources.Yes
            });
            options.push({
                id: "0",
                title: $rootScope.CommonResources.No
            });
        }, function(error) {
            baseCommon.pushMessages(error.content.messages);
        });
        return options;
    }

    function _getBooleanDropdownOptions() {
        var options = [];
        _commonResource().then(function(result) {
            options.push({
                id: "1",
                title: $rootScope.CommonResources.Yes
            });
            options.push({
                id: "0",
                title: $rootScope.CommonResources.No
            });
        }, function(error) {
            baseCommon.pushMessages(error.content.messages);
        });
        return options;
    }

    function _commonResource() {
        var defer = $q.defer();
        $timeout(function() {
            defer.resolve($rootScope.CommonResources);
        }, 1000);
        return defer.promise;
    }

    function _getLanguageFilterOptions() {
        var options = [];
        _commonResource().then(function(result) {
            options.push({
                id: "",
                title: $rootScope.CommonResources.All
            });
            languageService.getAll().then(function(result) {
                angular.forEach(result.content.model, function(value, key) {
                    options.push({
                        id: value.name,
                        title: value.name
                    });
                });
            }, function(error) {
                baseCommon.pushMessages(error.content.messages);
            });
        }, function(error) {
            baseCommon.pushMessages(error.content.messages);
        });
        return options;
    }

    function _populateResources() {
        resourceService.getAll().then(function(result) {
            angular.forEach(result.content.model, function(resource, key) {
                $rootScope[key] = {};
                angular.forEach(resource, function(item, child_key) {
                    $rootScope[key][child_key] = item = "" ? child_key : item;
                });
            });
        }, function(ex) {
            _debug("ERROR::When retrieving resource", 'error');
            _debug(ex, 'error');
        });
    }

    function _setTitle(title) {
        _commonResource().then(function(result) {
            document.title = result[title] + " | Mongosilakan";
        }, function(error) {
            baseCommon.pushMessages(error.content.messages);
        });
    }

    function _clearErrorMessages() {
        var tempMessage = angular.copy($rootScope.messages);
        $rootScope.messages.length = 0;
        angular.forEach(tempMessage, function(item, key) {
            if (item.type == constants.message_type.success) {
                $rootScope.messages.push(item);
            }
        });
    }

    function _forceCloseModal() {
        $document[0].body.classList.remove('modal-open');
        angular.element($document[0].getElementsByClassName('modal-backdrop')).remove();
        angular.element($document[0].getElementsByClassName('modal')).remove();
    }

    function _clearMessages() {
        if ($rootScope.messageIsViewed) {
            $rootScope.messages.length = 0;
        } else {
            $rootScope.messageIsViewed = true;
        }
    }

    function _pushMessages($messages) {
        _clearMessages();
        if ($.isArray($messages)) {
            angular.forEach($messages, function(item) {
                switch (item.type) {
                    case 'success':
                        item.icon = 'check';
                        break;
                    case 'error':
                        item.icon = 'ban';
                        break;
                }
                $rootScope.messages.push(item);
            });
        } else {
            _debug($messages, 'error');
            // var newItem = {
            //     type: 'error',
            //     message: $messages
            // };
            // $rootScope.messages.push(newItem);
        }
        $('html, body').animate({
            scrollTop: 0
        }, 'fast');
        $rootScope.messageIsViewed = false;
    }

    function _getNavigation() {
        var navigation = {
            saleStock: {
                label: "SaleStock",
                hasSubs: true,
                icon: "fa-cogs",
                subs: {
                    products: {
                        label: "Product",
                        url: "saleStock/products",
                        icon: "fa-truck",
                    }
                }
            },
            starWars: {
                label: "StarWars",
                hasSubs: true,
                icon: "fa-flag",
                subs: {
                    people: {
                        label: "People",
                        url: "starWars/people",
                        icon: "fa-user",
                    }
                }
            }
        };
        return navigation;
    }

    function _shortcut() {
        _debug($rootScope.shortcutCommand);
    }

    function _sitebarAction($event, $isChild) {
        if (!angular.element($event.currentTarget).find('ul').length) {
            angular.element($event.currentTarget).parent().find('li.active').removeClass('active');
            angular.element($event.currentTarget).addClass('active');
        }
        if ($isChild) {
            angular.element($event.currentTarget).parent().parent().parent().find('li.active').removeClass('active');
            angular.element($event.currentTarget).parent().find('li.active').removeClass('active');
            angular.element($event.currentTarget).parent().parent().addClass('active');
            angular.element($event.currentTarget).parent().addClass('active');
            angular.element($event.currentTarget).addClass('active');
        }
    }
}
// First, checks if it isn't implemented yet.
if (!String.prototype.format) {
    String.prototype.format = function() {
        var args = arguments;
        return this.replace(/{(\d+)}/g, function(match, number) {
            return typeof args[number] != 'undefined' ? args[number] : match;
        });
    };
}

function _debug($message, $type) {
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
    switch ($type) {
        case 'error':
            toastr.error(JSON.stringify($message));
            break;
        case 'info':
            toastr.info(JSON.stringify($message));
            break;
        case 'warning':
            toastr.warning(JSON.stringify($message));
            break;
        case 'success':
            toastr.success(JSON.stringify($message));
            break;
        default:
            toastr.info(JSON.stringify($message));
            break;
    }
}
