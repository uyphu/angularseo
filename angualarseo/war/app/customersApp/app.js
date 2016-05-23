'use strict';
//function init() {
// 	//window.init();
//	alert('Ok');
//}
(function () {
	
	  var app = angular.module('customersApp',
	  ['ngRoute', 'ngAnimate', 'wc.directives', 'ui.bootstrap', 'breeze.angular']);
	
	  app.config(['$routeProvider', '$locationProvider', function ($routeProvider, $locationProvider) {
		
			var viewBase = '/app/customersApp/views/';
			  $routeProvider
			      .when('/home', {
			          controller: 'HomeController',
			          templateUrl: viewBase + 'home.html',
			          controllerAs: 'vm'
			      })
			      
			      .when('/about', {
			          controller: 'AboutController',
			          templateUrl: viewBase + 'about.html',
			          controllerAs: 'vm'
			      })
			      .when('/login/:redirect*?', {
			          controller: 'LoginController',
			          templateUrl: viewBase + 'login.html',
			          controllerAs: 'vm'
			      });
			      //.otherwise({ redirectTo: '/home' });
			  // use the HTML5 History API
			  $locationProvider.html5Mode(true);
			  //$locationProvider.hashPrefix('!');
			}]);

	
	app.run(['$rootScope', '$location', 'authService',
	  function ($rootScope, $location, authService) {
	      
	      //Client-side security. Server-side framework MUST add it's 
	      //own security as well since client-based security is easily hacked
	      $rootScope.$on("$routeChangeStart", function (event, next, current) {
	          if (next && next.$$route && next.$$route.secure) {
	              if (!authService.user.isAuthenticated) {
	                  $rootScope.$evalAsync(function () {
	                      authService.redirectToLogin();
	                  });
	              }
	          }
	      });
	      
	      $rootScope.$on('$routeChangeSuccess', function () {
	    	  var interval = setInterval(function () {
		    	  if (document.readyState == 'complete') {
		    		  //code that executes when partial view is loaded
		    		//find the main heading tag for the help topic
		    		  var heading = document.querySelector('#content h2');
		    		  if (heading !== null) {
		    		  // set page title to topic heading
		    		  document.title = heading.textContent.trim() + ' - SEO';
		    		  }
		    		  
		    		//find meta description tag
		    		  var meta = document.querySelector('meta[name=description]');
		    		  //find first paragraph in the help topic that isn't empty
		    		  var content = document.querySelector('#content p:not(:empty)');
		    		  if (meta !== null && content !== null) {
		    		  // set meta description to content of first paragraph in topic
		    		  meta.setAttribute('content', content.textContent.trim());
		    		  }
		    	  }
	    	  }, 200);
	      });
	
	}]);
	
})();
