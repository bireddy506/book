'use strict';

angular.module('myApp.profile', ['ui.router'])

.config(['$stateProvider', function($stateProvider) {
  
  $stateProvider
  .state('index.profile',{
    url:'/profile/:userId',
    templateUrl:"profile/profile.html",    
    controller:'profileController'
 });
}])



.controller('profileController', ['$scope','$rootScope','$stateParams', 'MetaService','$http','SESSIONDATA','$state', function($scope, $rootScope,$stateParams,MetaService, $http,SESSIONDATA,$state) {
	// Configure Meta Tags and Title
	$rootScope.metaservice = MetaService;
    $rootScope.metaservice.set("User Profile | Books Inventory","desc","");

    $rootScope.UserData = SESSIONDATA.getSession();    
  	if($rootScope.UserData.userName == undefined){
      $state.go('login');
  	}
      $scope.userId = $stateParams.userId;
      console.log($scope.userId);

      var startTime = new Date().getTime();
      $http.get(SERVERAPI + 'api/user?userId='+$scope.userId, {timeout : TIMEOUT}).then( 
        function(response) {
            if (response.data.status) {
              $scope.resObj = response.data.data;
              $state.go("index.profile",{data:$scope.resObj});
              }
              else 
              {
              $scope.errorMsg = (response.data.message || '{}');
              alert(response.data.message);
            }
        },function(error) {            
            var respTime = new Date().getTime() - startTime;
              if(respTime >= TIMEOUT){
                alert('Server is busy, please try again.');
              }else{  
                alert('Something went wrong, Please contact administrator.');
              }
        }); 

  

    
}]);