(function(ng) {
    ng.module('app')
        .factory('RequestInterceptor', ["$q", "$injector", "Utils", function ($q, $injector, Utils) {
        return {
            request: function (config) {
                config.headers = config.headers || {};
                // if (TokenStorageService.retrieve()) {
                //     config.headers.Authorization = 'Bearer ' + (TokenStorageService.retrieve()).access_token;
                // }
                return config;
            },
            responseError: function (response) {
                if(response != null) {
                    if (response.status === 0) {
                        var deferred = $q.defer();

                        var req = {
                            method: 'GET',
                            url: Utils.restUrl + '/api/',
                        };

                        $injector.get("$http")(req)
                            .then(function(res) {
                                if (res.status === 200) {
                                    response.config.url = response.config.url.replace(Utils.localUrl, Utils.restUrl);
                                    $injector.get("$http")(response.config).then(function(response) {
                                        deferred.resolve(response);
                                    }, function(response) {
                                        deferred.reject();
                                    });
                                } else {
                                    deferred.reject();
                                    return;
                                }
                            }, function() {
                                deferred.reject();
                                return;
                            });

                        return deferred.promise;
                        }
                    }

                    return $q.reject(response);

                }
        }
    }]);

})(angular);