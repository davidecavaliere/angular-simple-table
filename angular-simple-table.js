'use strict';

angular.module('ui.simple-table', [])
  .directive('ngTable', function () {
    var checkboxes = false;
    return {
      restrict: 'E',
      scope : {
        items : '=',
        headers : '=',
        excludeHeaders : '=',
        paginator : '=',
        plucker : '=',
        checkboxes : '='
      },
      replace : true,
      //transclude : true,
      link: function postLink(scope, element, attrs) {
      },
      controller : function($scope) {
        $scope.selectedItems = [];

        // use checkboxes?
        checkboxes = $scope.checkboxes || false;

        // initialize page
        $scope.page = 1;

        // calculate the number of pages given the page size
        var calculateNumberOfPages = function(totalItems, size) {
          var pages = Math.ceil(totalItems/size);
          var pagesArray = [];
          for (var i=1; i<=pages; i++) {
            pagesArray.push(i);
          }
          return pagesArray;
        }

        // paginate - actually set the visibleItems for the current page
        var paginate = function(page, size) {
          $scope.visibleItems = [];
          $scope.paginator.pages = calculateNumberOfPages($scope.paginator.totalItems, $scope.paginator.itemsPerPage);
          if ($scope.page>$scope.paginator.pages.length) {
            $scope.page = 1;
            page = 1;
          }
          for (var i=(page-1)*size+1; i<=page*size; i++) {
            if ($scope.items[i]) {
              $scope.visibleItems.push($scope.items[i]);
            }
          }
        }

        // Default page sizes available
        $scope.pageSizes = [1,5,10,20,50,100,250];
        
        // Number of pages at initialization
        $scope.paginator.pages = calculateNumberOfPages($scope.paginator.totalItems, $scope.paginator.itemsPerPage);

        // clean visible items at initialization
        $scope.visibleItems = [];

        // populate visible items
        paginate($scope.page || 1, $scope.paginator.itemsPerPage);

        // called when selecting a row
        $scope.select = function() {
          $scope.selected = this.item;
        }

        // called wher changing page
        $scope.changePage = function() {
          $scope.page = this.i;
          paginate($scope.page, $scope.paginator.itemsPerPage);
        }

        // watch the page size selector and repaginate the items
        $scope.$watch('paginator.itemsPerPage', function(newValue, oldValue, scope) {
          debugger;
          paginate($scope.page, newValue);
        });

        $scope.toggleAll = function() {
          if ($scope.selectAll) {
            console.log("Select All");
            angular.forEach($scope.visibleItems, function(value, key){
              $scope.selectedItems.push(value);
            });
          } else {
            console.log("Unselect All");
            $scope.selectedItems = [];
          }
        };

        $scope.toogle = function(item) {
          console.log("Select/Unselect ");
          console.log(item);
          $scope.selectedItems.push(item);
        }

      },
      template : '<div>' + 
        '<div>' +
          '<table class="table table-striped table-hover">' +
            '<thead>' +
              '<tr>' + 
                '<th ng-class="{\'hidden\': !checkboxes}"><input ng-change="toggleAll();" ng-model="selectAll" type="checkbox"></input></th>' + 
               '<th ng-repeat="h in headers">{{h}}</th>' +
              '</tr>' +
            '</thead>' +
            '<tbody>' +
              '<tr ng-repeat="item in visibleItems">' +
                '<td ng-class="{\'hidden\': !checkboxes}"><input ng-change="toogle(item);" ng-model="selectThis" type="checkbox"></input></td>' +
                '<td ng-class="{\'active text-success\': selectedItems.indexOf(item) !== -1}" ng-repeat="h in headers" ng-click="select();">{{item[h]}}</td>' +
              '</tr>' +
            '</tbody>' +
          '</table>' +
        '</div>' +
        '<div class="row">' +
          '<div class="col-md-2 text-center">' +
            '<select class="form-control" ng-model="paginator.itemsPerPage">' + 
              '<option ng-repeat="s in pageSizes">{{s}}</option>' +
            '</select>' +
          '</div>' +
          '<div class="col-md-8 text-center">' +
            '<ul class="pagination">' +
              '<li class="disabled" ><a href="">&laquo;</a></li>' +
              '<li ng-class="{\'active\' : i===page}" ng-repeat="i in paginator.pages" ng-click="changePage();"><a href="">{{i}} <span ng-show="i===page ? true : false" class="sr-only">(current)</span></a></li>' +
              '<li class="disabled" ><a href="">&raquo;</a></li>' +
            '</ul>' +
          '</div>' +
        '</div>' +
      '</div>'
    };
  });