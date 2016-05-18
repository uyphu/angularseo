/**
 * loginController.js
 * Author: Phu
 * Date: Apr 10, 2015
 */

'use strict';
//function init() {
// 	window.init();
//}
(function () {

	var injectParams = ['$location', '$routeParams', '$window', '$scope', 'authService'];

    var LoginController = function ($location, $routeParams, $window, $scope, authService) {
    	
        var vm = this,
            path = '/';

        vm.email = null;
        vm.password = null;
        vm.email = 'uyphu@yahoo.com';
        vm.password = '123456';

        vm.errorMessage = null;
        
        $window.init = function() {
//		  	$scope.$apply($scope.initgapi);
        	$scope.initgapi();
		}
		
        $scope.initgapi = function() {
			if (!AppConstant.USER_LOGIN_ENDPOINT_LOADED) {
				authService.init().then(function(){
					console.log('Loaded login endpoint.');
				},
				function(){
					console.log(ErrorCode.ERROR_INIT_ENDPOINT_SERVICE);
				});
			} 
		}

        vm.login = function () {
            authService.login(vm.email, vm.password).then(function (status) {
                //$routeParams.redirect will have the route
                //they were trying to go to initially
                if (!status) {
                    vm.errorMessage = 'Unable to login';
                    return;
                }

                if (status && $routeParams && $routeParams.redirect) {
                    path = path + $routeParams.redirect;
                }

                $location.path(path);
            });
        }
        
        init();
    };

    LoginController.$inject = injectParams;

    angular.module(AppConstant.APP_NAME).controller('LoginController', LoginController);

}());