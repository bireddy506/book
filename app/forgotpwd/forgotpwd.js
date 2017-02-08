'use strict';

angular.module('myApp.forgotpwd', ['ui.router'])

.config(['$stateProvider', function($stateProvider) {
  $stateProvider.state('forgotpwd', {
	  url:'/forgotpwd',
	  views : {
	  	"content": {
	  		templateUrl: 'forgotpwd/forgotpwd.html',
			controller: 'forgotpwdController'
    
	  	}
	  }
		
  });
}])

.controller('forgotpwdController', ['$scope','$rootScope', 'MetaService','$http','$state', function($scope, $rootScope, MetaService, $http, $state) {
	// Configure Meta Tags and Title
	$rootScope.metaservice = MetaService;
    $rootScope.metaservice.set("Forgot Password | Book Inventory","desc","");
	
	$scope.forgotPassword = function(emailId){
		
		    var startTime = new Date().getTime();  
		    $http.post(SERVERAPI+"api/forgotpwd",emailId,{timeout : TIMEOUT}).then(function(result){
		    	if(result.data.status) {
		    		console.log(result.data.status);
		    	}
		    	else
		    	{
		    	console.log(result.data.message);	
		    	}
		    },function(error){
		    	var respTime = new Date().getTime() - startTime;
              if(respTime >= TIMEOUT){
                alert('Server is busy, please try again.');
              }else{
                alert('Something went wrong, Please contact administrator.');
              }

		    }); 


		
		
	}




}])
