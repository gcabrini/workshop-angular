(function(ng) {

    var config = {
        VIEW_PATH: "view/"
    }

    ng.module('app', [])
        .constant('config', config)
        .run(['$rootScope', function($rootScope) {
            $rootScope.VIEW_PATH = config.VIEW_PATH;
        }])
        .config(['$httpProvider', function($httpProvider) {
            $httpProvider.interceptors.push("RequestInterceptor");
            //$httpProvider.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
        }]);
})(angular);