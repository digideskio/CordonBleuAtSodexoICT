angular.module('starter.controllers', [])

  .controller('IndexCtrl', function($scope, Menu, CordonComing) {
    $scope.cordon = false;
    $scope.nocordon = false;
    Menu.then(function(menu){
      var cordon = CordonComing.get(menu);
      if (cordon) {
        var cordonDate = new Date(cordon);
        var day = cordonDate.getDate();
        var month = cordonDate.getMonth()+1;
        var year = cordonDate.getFullYear();
        $scope.cordonDate = day+'.'+month+'.'+year;
        $scope.cordon = true;
      } else {
        $scope.nocordon = true;
      }
    });
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
