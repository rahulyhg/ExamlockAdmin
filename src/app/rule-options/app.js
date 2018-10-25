var app = angular2.module('tag', ['ngTagsInput']);

app.controller('MainCtrl', function($scope, $http) {

});
app.directive('enforceMaxTags', function() {
    return {
      require: 'ngModel',
      link: function(scope, element, attrs, ngCtrl) {
        var maxTags = attrs.maxTags ? parseInt(attrs.maxTags, '10') : null;
  
        ngCtrl.$parsers.push(function(value) {
          if (value && maxTags && value.length > maxTags) {
            value.splice(value.length - 1, 1);
          }
          return value;
        });
      }
    };
  });