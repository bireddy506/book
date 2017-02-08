'use strict';

angular.module('myApp.login', ['ui.router'])

.config(['$stateProvider', function($stateProvider) {
  $stateProvider.state('login', {
		url:'/login',
		views: {
			"content": {
				templateUrl:"login/login.html",
				controller: 'loginController'
			}
		}
		
		
  });
}])

.controller("loginController",["$scope","$location","$rootScope","$http","MetaService","$state","SESSIONDATA",function($scope,$location,$rootScope,$http,MetaService,$state,SESSIONDATA){
	$rootScope.metaservice = MetaService;
    $rootScope.metaservice.set("Login | Book Inventory","desc","");
	$scope.userData = {};
	
	$scope.checkLogin = function(info){
   		//console.log(info);
   		  		
	    var startTime = new Date().getTime();
	    $http.post(SERVERAPI + 'api/login', info, {timeout : TIMEOUT}).then( 
	    function(result) 
	    {
	    	//console.log(result);
			//console.log(result.data);
			//console.log(result.data.data);
	        if (result.data.status) 
        	{
        		SESSIONDATA.setSession(result.data.data);
	        	//$location.path('/index/dashboard');
	        	$state.go('index.dashboard');
	        } 
	        else
	        {

	        	//alert(result.data.message);
	        	$scope.errorMsg = result.data.message;
				$scope.errorClass = "errorMsgHIde"
				$scope.appliedClass = function(errorMsg) {
				if (errorMsg == $scope.errorMsg) {
				return "errorMsgHide";
				} else {
				return ""; // Or even "", which won't add any additional classes to the element
				}
				}
	        	$state.transitionTo($state.current,{data:'$scope.errorMsg'})

	        }
	    },function(error) {
	        
	        var respTime = new Date().getTime() - startTime;
	        if(respTime >= TIMEOUT){
	        	$scope.errorMessage = "Server is busy,Please try again";
	          
	        }else{
	        	$scope.errorMessage1 = "Please check entered details";
	          
	        }
	    });

   };
}])

.service("SESSIONDATA",function(){
	var setSession = function(user_data){
		console.log(user_data);
		window.localStorage.userDetails = JSON.stringify(user_data);
	};
	
	var getSession = function(){
		return JSON.parse(window.localStorage.userDetails || '{}');
	}
	var deleteSession = function(){
        window.localStorage.removeItem("userDetails");
        return true;
    };
	return {
		setSession: setSession,
		getSession: getSession,
		deleteSession: deleteSession
	};
})