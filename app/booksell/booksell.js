'use strict';

angular.module('myApp.booksell', ['ui.router'])

.config(['$stateProvider', function($stateProvider) {
  
  $stateProvider.state('index.booksell',{
    url:'/booksell',
    templateUrl:"booksell/booksell.html",
    controller:"bookSellController"
 });
}])



.controller('bookSellController', ['$scope','$rootScope', 'MetaService','$http','$state', function($scope, $rootScope, MetaService, $http, $state) {
	// Configure Meta Tags and Title
	$rootScope.metaservice = MetaService;
    $rootScope.metaservice.set("Books Sell | Book Inventory ","desc","");
    
    $http.get(SERVERAPI+'api/book').then(function(success){
	//console.log(success.data);
	$rootScope.books = success.data.data;
	},function(error){
	console.log(error.data)
	$scope.bookserr = error.data;
});
    $scope.bookQuaty = false;

    $scope.getBookId = function(bookId){
        console.log(bookId);
        $scope.bookId = bookId;
        
        $scope.bookData = $rootScope.books;
        //console.log($scope.bookData);
        for (var i = $scope.bookData.length - 1; i >= 0; i--) {
            $scope.bookData[i];
            //console.log($scope.bookData[i]._id);
            if($scope.bookId == $scope.bookData[i]._id)
            {
                $scope.bookQuaty = true;                
                //console.log($scope.bookData[i].quantity);
                $scope.bookQuantity = ($scope.bookData[i].quantity || 0);
                console.log($scope.bookQuantity);
            }
            
        }
        

    
        
    }
    
    $scope.loading = false;

    $scope.sellBook = function(book){
        $scope.loading = true;
    	
    	$scope.userId = $rootScope.UserData._id;
    	
    	book.userId = $scope.userId;

        var startTime = new Date().getTime();

    	$http.post(SERVERAPI+'api/sellbook',book,{timeout : TIMEOUT}).then(function(response){
            if (response.data.status)
            {
                //console.log(response.data.message);
                //console.log(response.data.data);
                //$rootScope.successmessage = (response.data.message || '{}');
                $scope.loading = false;
                $scope.successMsg = response.data.message;
                $scope.successMsg2 = "Book Sold successfully"
                alert($scope.successMsg2);
                $state.go($state.current,{data:"$scope.successMsg2"},{reload:true})
                //$state.transitionTo($state.current, {data:'$rootScope.successmessage'}, {reload: true});
            }
            else
            {
                $scope.loading = false;
                $rootScope.errormessage = (response.data.message || '{}');
                alert($rootScope.errormessage);
                
                $state.transitionTo($state.current, {data:'$rootScope.errormessage'}, {reload: true});
                //alert(result.data.message);
            }
        },
        function(error) 
        {
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