'use strict';

const SERVERAPI = "https://fierce-hollows-55761.herokuapp.com/";
const TIMEOUT = 15000;
// Declare app level module which depends on views, and components
angular.module('myApp', [
  'ui.router',
  'myApp.metaservice',
  'myApp.login',
  'myApp.registration',
  'myApp.forgotpwd',  
  'myApp.index',
  'myApp.dashboard',
  'myApp.checkin',
  'myApp.search',
  'myApp.list',
  'myApp.details',
  'myApp.changepwd', 
  'myApp.booksell',
  'myApp.profile',
  'myApp.version'
]).

config(['$locationProvider', '$urlRouterProvider', '$stateProvider', function($locationProvider, $urlRouterProvider, $stateProvider) {


}])
.run([ '$rootScope', '$location', '$anchorScroll','$state', function( $rootScope, $location, $anchorScroll, $state) {
  $rootScope.$on("$locationChangeSuccess", function(){
    $anchorScroll();
  });
  $state.go('login');
}])
.controller('masterController', ['$scope','$location','$rootScope','SESSIONDATA', function($scope,  $location, $rootScope,SESSIONDATA){
	
	$scope.logout = function(){
      SESSIONDATA.deleteSession();
      $rootScope.UserData = SESSIONDATA.getSession();
      $state.go('login');

    };
    
}])
;
