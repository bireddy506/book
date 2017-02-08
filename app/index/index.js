'use strict';

angular.module('myApp.index', ['ui.router'])

.config(['$stateProvider', function($stateProvider) {


  $stateProvider.state('index',{
    url:'/index',
    views: {
      "header": {
        templateUrl:"index/index.html"
      },
      "content": {
        template:"<div ui-view></div>"

      }
      
    }
 })

}])


.controller('indexController', ['$scope','$rootScope', 'MetaService','SESSIONDATA','$state', function($scope, $rootScope, MetaService, SESSIONDATA, $state) {
	// Configure Meta Tags and Title
	
	$rootScope.metaservice = MetaService;
    $rootScope.metaservice.set("Dashboard | Book Inventory","desc","");

$scope.$state = $state;


    $rootScope.UserData = SESSIONDATA.getSession();
    console.log(typeof $rootScope.UserData.userName);
  	if($rootScope.UserData.userName == undefined){
  		$state.go('login');
  	}
	
	$scope.logout = function(){
		console.log("logout");
      SESSIONDATA.deleteSession();
      $rootScope.UserData = SESSIONDATA.getSession();
      //$state.transitionTo($state.current,{},reload:true);
	  $state.go("login");
    };

}]);
