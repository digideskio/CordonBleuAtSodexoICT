angular.module('starter.controllers', [])

  .controller('IndexCtrl', function($scope, Menu, CordonComing) {
    $scope.cordon = false;
    Menu.then(function(menu){
      $scope.cordon = CordonComing.get(menu);
      console.log($scope.cordon);
    });
    $scope.success = 'false';

  })
  .controller('MenuCtrl', function($scope, Menu) {
    $scope.success = 'false';
    $scope.menu = [];
    Menu.then(function(menu){
      $scope.menu = menu;
      console.log(menu);
    });

  })
  .controller('SettingsCtrl', function($scope) {
    $scope.success = 'false';

  });
