(function(ng) {
    ng.module('app')
        .constant('Utils', {
          "localUrl": "http://localhost:3000",
          "restUrl": "http://172.21.186.43:3000"
    });
})(angular);