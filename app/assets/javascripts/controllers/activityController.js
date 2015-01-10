VirtueViceApp.controller('ActivityCtrl', this.ActivityCtrl = function($scope, $rootScope, ActivityService) {

  $scope.activites = [];
  $scope.newActivityForm = "";
  $scope.expandActivityForm = function() {

    $('#newActivityForm').css('display', 'block');
  };

  // clear and hide form
  $scope.collapseActivityForm = function() {

    $scope.newActivityForm.verb = "";
    $scope.newActivityForm.relationship = "";
    $scope.newActivityForm.amount = "";
    $scope.newActivityForm.subject = "";
    $scope.newActivityForm.interval = "";

    $('#newActivityForm').css('display', 'none');
  };

  $scope.submitActivityForm = function() {
    ActivityService.addActivity($scope.newActivityForm).then(function(data) {
      console.log("Success saving new Task on server");
      $scope.updateActivities();
      $scope.collapseActivityForm();
    }), function(data) {
      console.log("Error saving new Task on server");
    };
  };

  $scope.updateActivities = function() {
    ActivityService.getActivities().then(function(data) {
      $scope.activities = data;
      console.log("Success updating activities");
      console.log(data);
    }, function(data) {
      console.log("Error updating activities");
    });
  };

  $scope.deleteActivity = function(id) {
    ActivityService.deleteActivity(id).then(function(data) {
      console.log("Success removing Activity from server");
      $scope.updateActivities();
    }, function(data) {
      console.log("id = " + id);
      console.log("Error removing Activity from server");
    });
  };


  // Initialization code

  $scope.updateActivities();

});
