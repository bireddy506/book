'use strict';
//changepwdCtrlr
angular.module("myApp.changepwd",["ui.router"])
.config(["$stateProvider",function($stateProvider){
	$stateProvider
	.state("index.changepwd",{
		url:"/changepwd",
		templateUrl:"changepwd/changepwd.html",
		controller:"changepwdCtrlr"
	})
}])
.controller("changepwdCtrlr",["$scope","$rootScope","$state","$http","SESSIONDATA","MetaService",function($scope,$rootScope,$state,$http,SESSIONDATA,MetaService){
	$rootScope.metaservice = MetaService;
    $rootScope.metaservice.set("Change Password | Books Inventory","desc","");
	$rootScope.UserData = SESSIONDATA.getSession();
    console.log(typeof $rootScope.UserData.userName);
  	if($rootScope.UserData.userName == undefined){  		
		$state.go('login');
  	}
	
	$scope.changepassword = function(userdata){
		var startTime = new Date().getTime();
		$scope.userId = $rootScope.UserData._id;
		userdata.userId = $scope.userId;
		$http.post(SERVERAPI+"api/updateprofile",userdata,{timeout: TIMEOUT}).then(function(response){
			console.log(response.data.data);
			console.log(response.data.message);
			$rootScope.successMsg = (response.data.message || '{}');
			$scope.result = response.data.data;
			//$scope.successMsg = "Password Changed Suuccessfully!!!";
			//$state.go($state.current,{data: "$scope.succesMsg"},{reload:true});
			$state.transitionTo($state.current, {data:'$rootScope.successMsg'}, {reload: true});
		},function(error){
			$scope.errorMsg = response.data.message;
			$state.go($state.current,{});
		});
	};
	
	
}]);

