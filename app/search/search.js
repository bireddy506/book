'use strict';

angular.module('myApp.search', ['ui.router'])

.config(['$stateProvider', function($stateProvider) {
  
  $stateProvider
  .state('index.search',{
    url:'/search',
    templateUrl:"search/search.html",
    controller:"searchController"
 })
 .state('index.searchResults',{
	 url:'/searchResults',
	 templateUrl:'search/searchResults.html',
	 controller:'searchResultsCtrl'
 });
}])

.controller("searchResultsCtrl",["$scope","$rootScope","MetaService","SESSIONDATA","$http","$state",function($scope,$rootScope,MetaService,SESSIONDATA,$http,$state){
	 $rootScope.UserData = SESSIONDATA.getSession();
    console.log(typeof $rootScope.UserData.userName);
  	if($rootScope.UserData.userName == undefined){
  		$state.go('login')
  	}
	$scope.searchResultsObj = $rootScope.searchBooks;
}])

.controller('searchController', ['$scope','$rootScope', 'MetaService','SESSIONDATA','$http','$state', function($scope, $rootScope, MetaService, SESSIONDATA, $http, $state) {
	// Configure Meta Tags and Title
	$rootScope.metaservice = MetaService;
    $rootScope.metaservice.set("Search | Book Inventory","desc","");
	$scope.searchResultsBlk = false;
	$scope.errorMsgBlk = false;
    $rootScope.UserData = SESSIONDATA.getSession();
    console.log(typeof $rootScope.UserData.userName);
  	if($rootScope.UserData.userName == undefined){
  		$state.go('login')
  	}
  	$rootScope.searchBooks = {};
  	$scope.searchBooks = { ISBN: '', title: ''};
    $scope.disableTitle = false;
    $scope.disableISBN = false;
	
  	 $scope.searchByValue = function(attr, prop){
  	 	console.log(prop);
	    if(attr == 'ISBN'){
	      var startTime = new Date().getTime();
	          $http.get(SERVERAPI+ 'api/searchbook?ISBN='+prop, {timeout : TIMEOUT}).then( 
	          function(result) {
	            if (result.data.status && result.data.data.length > 0) {
	            	$scope.bookResult = result.data.data;
					//console.log($rootScope.searchBooks);
					
					$scope.searchResultsBlk = true;					
					$scope.errorMsgBlk = false;
					$state.transitionTo($state.current,{data:'$scope.bookResult'});
              		
              		
                } else {
					$scope.bookResult={};
                	//alert('No Books Found');
                }
	          },function(error) {
	              var respTime = new Date().getTime() - startTime;
	              if(respTime >= TIMEOUT){
	                  alert('Server is busy, please try again.');
	              }else{
	                alert('Title, publisher details not found on this ISBN number.');
	              }
	          }); 
	              
	   }else{
	          var startTime = new Date().getTime();
	          $http.get(SERVERAPI+ 'api/searchbook?title='+prop, {timeout : TIMEOUT}).then( 
	          function(result) {
	            if (result.data.status && result.data.data.length > 0) {
	             
               	 $scope.bookResult = result.data.data;
              		console.log($rootScope.bookResult);
					//$state.go('index.searchResults');
					$scope.searchResultsBlk = true;
					$scope.errorMsgBlk = false;
					$state.transitionTo($state.current,{data:'$rootScope.bookResult'});
                } else {
					$scope.searchResultsBlk = false;
					$scope.bookResult={};
					$scope.errorMsgBlk = true;
					$scope.errorMsg = "No Books Found"
                  
                }
	          },function(error) {
	             
	              var respTime = new Date().getTime() - startTime;
	              if(respTime >= TIMEOUT){
	                  alert('Server is busy, please try again.');
	              }else{
	                alert('Title, publisher details not found on this ISBN number.');
	              }
	          });
	   }
	};

	$scope.disableButton = function(data){
   if(($scope.searchBooks.ISBN == '' || $scope.searchBooks.ISBN == ' ' ) && ($scope.searchBooks.title == '' || $scope.searchBooks.title == ' ')){
    
    $scope.disableTitle = false;
    $scope.disableISBN = false;

  }else if(($scope.searchBooks.ISBN !== '' || $scope.searchBooks.ISBN !== ' ') && ($scope.searchBooks.title == '' || $scope.searchBooks.title == ' ')){
    
    $scope.disableTitle = true;
    $scope.disableISBN = false;
    $scope.searchbyISBN = true;
  }else{
    
    $scope.disableTitle = false;
    $scope.disableISBN = true;
    $scope.searchbyISBN = false;
  }
}
$scope.disableButton2 = function(data){
  if($scope.searchBooks.ISBN == '' && $scope.searchBooks.title == ''){
    
    $scope.disableTitle = false;
    $scope.disableISBN = false;
  }else if($scope.searchBooks.ISBN !== '' && $scope.searchBooks.title == ''){
    
    $scope.disableTitle = true;
    $scope.disableISBN = false;
    $scope.searchbyISBN = true;
  }else{
    
    $scope.disableTitle = false;
    $scope.disableISBN = true;
    $scope.searchbyISBN = false;
  }
};

}]);