'use strict';

angular.module('myApp.dashboard', ['ui.router'])

.config(['$stateProvider', function($stateProvider) {

  $stateProvider
  .state('index.dashboard',{
    url:'/dashboard',
    templateUrl:"dashboard/dashboard.html",
    controller:"dashboardCtrl"
  });
 
}])


.controller('dashboardCtrl', ['$scope','$rootScope', 'MetaService','SESSIONDATA','$location', function($scope, $rootScope, MetaService, SESSIONDATA, $location) {
	// Configure Meta Tags and Title
	
	$rootScope.metaservice = MetaService;
    $rootScope.metaservice.set("Dashboard | angular-seed","desc","");




    $rootScope.UserData = SESSIONDATA.getSession();
    console.log(typeof $rootScope.UserData.userName);
  	if($rootScope.UserData.userName == undefined){
  		$location.path('/login');
  	}
	
	$scope.logout = function(){
		console.log("logout");
      SESSIONDATA.deleteSession();
      $rootScope.UserData = SESSIONDATA.getSession();
      $location.path('/login');
    };

}]);
