'use strict';

angular.module('myApp.details', ['ui.router'])

.config(['$stateProvider', function($stateProvider) {
  
  $stateProvider.state('index.details',{
    url:'/details/:bookId',
    templateUrl:"details/details.html",
    controller:"detailsController"
 });
}])




.controller('detailsController', ['$scope','$rootScope', 'MetaService','$http','$state','$stateParams', function($scope, $rootScope, MetaService, $http, $state,$stateParams) {
	
	$rootScope.metaservice = MetaService;
    $rootScope.metaservice.set("Books List | Book Inventory ","desc","");
	$scope.bookId = $stateParams.bookId;
	console.log($scope.bookId);
	$http.get(SERVERAPI+ 'api/book?bookId='+$scope.bookId, {timeout : TIMEOUT}).then(function(success){	

		console.log(success.data);
		$scope.resObj = success.data.data;
		$state.go("index.details",{data:$scope.resObj});
		
	},function(error){
		console.log(error.data.message);
		
	})

}]);