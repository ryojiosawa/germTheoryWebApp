angular.module('app.controllers.settings', [])
  .controller('SettingsCtrl', function($scope, $location, Settings, LocalStorageService) {
    $scope.locationTracking = Settings.getLocationTracking();
    $scope.user = {};

    $scope.getUsername = function() {

      var userId = LocalStorageService.getItem('user_id');
      Settings.getUsername(userId)
        .then(function(user) {
          $scope.user.name = user.name;
          $scope.user.email = user.email;
        });
    };

    $scope.editSubmit = function() {
      var userId = LocalStorageService.getItem('user_id');
      Settings.editSubmit(userId, $scope.user)
        .then(function() {
          $location.path('/tab/settings');
        });
    };

    /*
     * Note: There is a bug in Ionic where ng-click fires twice on clicking a button
     * It appears that this issue only occurs in development environment but we need to confirm this in using an actual device once we're ready
     * https://github.com/driftyco/ionic/issues/1022
     * http://codepen.io/anon/pen/JrpuB?editors=101
     */
    $scope.toggleLocationTracking = function(event) {
      event.stopPropagation();
      $scope.locationTracking = ($scope.locationTracking === true) ? false: true;
      Settings.setLocationTracking($scope.locationTracking);
     };

     $scope.getUsername();
  });
