/**
 * customersController.js
 * Author: Phu
 * Date: Apr 10, 2015
 */

'use strict';
//function init() {
// 	window.init();
//}
(function (){
	
	var injectParams = ['$scope','$location','dataService','$window', '$timeout','$filter'];
	var CustomersController = function ($scope,$location,dataService,$window,$timeout,$filter) {	
		
		var vm = this;

        vm.customers = [];
        vm.filteredCustomers = [];
        vm.filteredCount = 0;
        vm.orderby = 'lastName';
        vm.reverse = false;
        vm.searchText = null;
        vm.cardAnimationClass = '.card-animation';

        //paging
        vm.totalRecords = 0;
        vm.pageSize = 10;
        vm.currentPage = 1;

        vm.pageChanged = function (page) {
            vm.currentPage = page;
            getCustomersSummary();
        };
		
		$window.init = function() {
		  	$scope.$apply($scope.initgapi);
		};
		$scope.initgapi = function() {
			if (!AppConstant.CUSTOMER_ENDPOINT_LOADED) {
				dataService.init().then(function(){
					if (AppConstant.CUSTOMER_ENDPOINT_LOADED) {
						getCustomersSummary('customersSummary',vm.currentPage - 1,vm.pageSize);
					}
				},
				function(){
					console.log(ErrorCode.ERROR_INIT_ENDPOINT_SERVICE);
				});
			}
			
		}
		
		function loadData() {
			if (AppConstant.CUSTOMER_ENDPOINT_LOADED) {
				getCustomersSummary('customersSummary',vm.currentPage - 1,vm.pageSize);
			} else {
				if (AppConstant.API_LOAD_TYPE != 0) {
					$scope.initgapi();
				} else {
					AppConstant.API_LOAD_TYPE = 2;
				}
			}
		}
		
		$scope.signin = function(loginform) {
		   	gapi.auth.authorize({client_id: AppConstant.CLIENT_ID,
		    scope: AppConstant.SCOPE, immediate: false
		    },
		    function(){
		    	console.log(ErrorCode.ERROR_AUTHORIZE_SERVICE);
		    });
		}
		
		vm.DisplayModeEnum = {
	            Card: 0,
	            List: 1
	        };

        vm.changeDisplayMode = function (displayMode) {
            switch (displayMode) {
                case vm.DisplayModeEnum.Card:
                    vm.listDisplayModeEnabled = false;
                    break;
                case vm.DisplayModeEnum.List:
                    vm.listDisplayModeEnabled = true;
                    break;
            }
        };

        vm.navigate = function (url) {
            $location.path(url);
        };

        vm.setOrder = function (orderby) {
            if (orderby === vm.orderby) {
                vm.reverse = !vm.reverse;
            }
            vm.orderby = orderby;
        };

        vm.searchTextChanged = function () {
            filterCustomers(vm.searchText);
        };
		  	    
		function getCustomersSummary(baseResource, pageIndex, pageSize) {
			dataService.getCustomersSummary('customersSummary',pageIndex,pageSize).then(function(data){
				console.log('getCustomersSummary called.');
				console.log(data);
				vm.totalRecords = data.totalRecords;
                vm.customers = data.results;
                filterCustomers(''); //Trigger initial filter

                $timeout(function () {
                    vm.cardAnimationClass = ''; //Turn off animation since it won't keep up with filtering
                }, 1000);
			});
		}
		
		function filterCustomers(filterText) {
            vm.filteredCustomers = $filter("nameCityStateFilter")(vm.customers, filterText);
            vm.filteredCount = vm.filteredCustomers.length;
        }

        function getCustomerById(id) {
            for (var i = 0; i < vm.customers.length; i++) {
                var cust = vm.customers[i];
                if (cust.id === id) {
                    return cust;
                }
            }
            return null;
        }
        
        loadData();
	  		
	};
	
	CustomersController.$inject = injectParams;
	angular.module(AppConstant.APP_NAME).controller('CustomersController', CustomersController);
}());


