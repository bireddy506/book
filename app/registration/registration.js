'use strict';

angular.module('myApp.registration', ['ui.router'])

.config(['$stateProvider', function($stateProvider) {
  $stateProvider.state('registration', {
	  url:'/registration',
	  views: {
	  	"content": {
	  		templateUrl:'registration/registration.html',
  			controller:'regController'
	  	}
	  }
	  
	 
  });
}])

.controller('regController', ['$scope','$rootScope', 'MetaService','$http','$location','$state', function($scope, $rootScope, MetaService, $http, $location,$state) {
	// Configure Meta Tags and Title
	$rootScope.metaservice = MetaService;
    $rootScope.metaservice.set("Registration | Book Inventory","desc","");

     $scope.userData = {};

	   $scope.userRegister = function(info){	   	 	
		    var startTime = new Date().getTime();
		    $http.post(SERVERAPI + 'api/registration', info, {timeout : TIMEOUT}).then( 
		    function(result) {
		    	//console.log(result);
		        if (result.data.status) {
					$rootScope.loginSuccess = "You are registered successfully. Please Login with your credentials.!!";
					//$location.path('/index');
					$state.go('login');

		        } else {
			        $scope.errorMsg = result.data.message;
			        //alert(result.data.message);
		        } 
		    },function(error) {
		        $scope.loading = false;
		        var respTime = new Date().getTime() - startTime;
		        if(respTime >= TIMEOUT){
		            alert('Server is busy, please try again.');
		        }else{
		          alert('Something went wrong, Please contact administrator.');
		        }
		    });
		    
	   }

}]);