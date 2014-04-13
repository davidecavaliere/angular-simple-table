'use strict';
angular.module('app', ['ngRoute', 'ui.simple-table'])
  .config(['$routeProvider', function ($routeProvider) {
    $routeProvider
      .when("/", { templateUrl: "views/main.html", controller: "SimpleTableDemo"})
      .otherwise({ redirectTo: "/" });
  }]);

angular.module('app')
  .controller('SimpleTableDemo',
    function ($scope) {
      $scope.items = [{A:'A', B:'a'}, {A: 'B', B:'b'}, {A:'C', B:'c'}, {A:'D', B:'d'}];
      for (var i=0; i<100; i++) {
      	$scope.items.push({A : i, B: '_' + i});
      }
      $scope.headers = ['A', 'B'];

      $scope.paginator = {
      	totalItems : $scope.items.length,
      	itemsPerPage : 20
      }
    });