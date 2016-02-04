angular.module('starter.controllers', [])

  .controller('IndexCtrl', function($scope, Menu, CordonComing) {
    Menu.then(function(menu){
      var cordon = CordonComing.get(menu);
      console.log(cordon);
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
