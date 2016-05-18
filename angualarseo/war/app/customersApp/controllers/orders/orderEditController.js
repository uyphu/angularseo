(function(){
	var injectParams = ['$scope', '$routeParams', '$timeout', 'orderService'];

    var OrderEditController = function ($scope, $routeParams, $timeout, orderService) {
    	var vm = this,
        customerId = ($routeParams.customerId) ? parseInt($routeParams.customerId) : 0,
        orderId = ($routeParams.orderId) ? parseInt($routeParams.orderId) : 0,
        timer,
        onRouteChangeOff;
        
        vm.order = {};
        vm.states = [];
        vm.title = (orderId > 0) ? 'Edit' : 'Add';
        vm.buttonText = (orderId > 0) ? 'Update' : 'Add';
        vm.updateStatus = false;
        vm.errorMessage = '';
        vm.order.customerId = customerId;
        vm.order.id = orderId;
        
        
        vm.navigate = function (url) {
            $location.path(url);
        };
        
		var init = function() {
			if (!AppConstant.ORDER_ENDPOINT_LOADED) {
				orderService.init().then(function(){
					loadData();
				},
				function(){
					console.log(ErrorCode.ERROR_INIT_ENDPOINT_SERVICE);
				});
			} else {
				loadData();
			}
			
		}
		
		var loadData = function () {
			if (vm.order.id > 0) {
				orderService.getOrder(vm.order.id)
                .then(function (order) {
                    vm.order = order;
                    //$scope.$broadcast('order', order);// Broadcast order to second controller
                }, function (error) {
                    $window.alert("Sorry, an error occurred: " + error.message);
                });
            }
		}
		
		vm.saveOrder = function () {
            if ($scope.editForm.$valid) {
            	if (vm.order.customerId > 0) {
            		if (!vm.order.id) {
            			orderService.insertOrder(vm.order).then(processSuccess, processError);
                    }
                    else {
                    	orderService.updateOrder(vm.order).then(processSuccess, processError);
                    }
				}
            }
        };
        
        function processSuccess() {
            $scope.editForm.$dirty = false;
            vm.updateStatus = true;
            vm.title = 'Edit';
            vm.buttonText = 'Update';
            startTimer();
        }

        function processError(error) {
            vm.errorMessage = error.message;
            startTimer();
        }

        function startTimer() {
            timer = $timeout(function () {
                $timeout.cancel(timer);
                vm.errorMessage = '';
                vm.updateStatus = false;
            }, 3000);
        }
		
		init();
    }
    
    OrderEditController.$inject = injectParams;

    angular.module(AppConstant.APP_NAME).controller('OrderEditController', OrderEditController);

}());