angular-simple-editor
================

Angular Simple Table is an angular directive to use a simple table.


Usage
--------------

1. Include the libraries
2. In your angular application register ui.simple-table as a dependency.
3. Add the necessary html to the view.

Registration

```js

// Angular Registration
angular.module('app', ['ui.simple-table']);

```

Bare Minimum Html
```html
<ng-table item="items" headers="header"></ng-table>
```

In the controller have something like the following
```js
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
```


Check out the demo folder where you can see a working example.  https://github.com/davidecavaliere/angular-simple-table



Bower Installation
--------------
```js
bower install davidecavaliere/angular-simple-table
```

