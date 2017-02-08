'use strict';

angular.module('myApp.list', ['ui.router'])

.config(['$stateProvider', function($stateProvider) {
  
  $stateProvider.state('index.list',{
    url:'/list',
    templateUrl:"list/list.html",
    controller:"listController"
 });
}])



.controller('listController', ['$scope','$rootScope', 'MetaService','$http','$state', function($scope, $rootScope, MetaService, $http, $state) {
	// Configure Meta Tags and Title
	$rootScope.metaservice = MetaService;
    $rootScope.metaservice.set("Books List | Book Inventory ","desc","");

$http.get(SERVERAPI+'api/book').then(function(success){
	console.log(success.data);
	$rootScope.books = success.data.data;
	},function(error){
	console.log(error.data)
	$scope.bookserr = error.data;
})

}]);