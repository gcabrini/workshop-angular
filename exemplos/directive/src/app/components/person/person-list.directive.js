(function(ng) {
  ng.module('app')
    .directive('ngSparkline', function() {
      return {
        restrict: 'A',
        require: '^ngModel',
        scope: {
          ngModel: '='
        },
        template: '<div class="sparkline"><h4>Weather for {{ngModel}}</h4></div>'
      }
  });
})(angular);
