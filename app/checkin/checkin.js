'use strict';

angular.module('myApp.checkin', ['ui.router'])

.config(['$stateProvider', function($stateProvider) {
  
  $stateProvider
  .state('index.checkin',{
    url:'/checkin',
    templateUrl:"checkin/checkin.html",    
    controller:'checkinController'
 });
}])



.controller('checkinController', ['$scope','$rootScope','$stateParams', 'MetaService','$http','$location','SESSIONDATA','$state', function($scope, $rootScope,$stateParams,MetaService, $http, $location,SESSIONDATA,$state) {
	// Configure Meta Tags and Title
	$rootScope.metaservice = MetaService;
    $rootScope.metaservice.set("Books checkin | Books Inven","desc","");

    $rootScope.UserData = SESSIONDATA.getSession();
    console.log(typeof $rootScope.UserData.userName);
  	if($rootScope.UserData.userName == undefined){
  		//$location.path('/login');
		$state.go('login');
  	}

	
	   $scope.booksInsert = function(books){
      
      if(typeof books.ISBN13 == 'undefined'){
        books.ISBN = '';
      }else{
        books.ISBN = books.ISBN13.toString().replace(/-/g, "");
      }

      if(typeof books.ISBN10 == 'undefined'){
        books.ISBN10 = '';
      }else{
        books.ISBN10 = books.ISBN10.toString().replace(/-/g, "");
      }

      var userData = SESSIONDATA.getSession();
      books.userId = userData._id;

      var startTime = new Date().getTime();
      $http.post(SERVERAPI + 'api/book', books, {timeout : TIMEOUT}).then( 
        function(result) {
            if (result.data.status) {
              console.log(result.data.message);
              console.log(result.data.data);
                  
                  
                  $rootScope.insertMessage = (result.data.message || '{}');
                  $scope.form.$setPristine();
                  //$scope.books={};
					$state.transitionTo($state.current, {data:'$rootScope.insertMessage'}, {reload: true});
                  //$location.path('/index/checkin');
                  // alert("success fully inserted");
            } else {
              $scope.errorMsg = (result.data.message || '{}');
              
              alert(result.data.message);

            }
        },function(error) {
            
            var respTime = new Date().getTime() - startTime;
              if(respTime >= TIMEOUT){
                alert('Server is busy, please try again.');
              }else{  
                alert('Something went wrong, Please contact administrator.');
              }
        }); 

   };

    
}]);