(function() {

    var injectParams = ['$scope', 'modalService', 'orderService', '$timeout'];

    var OrderChildController = function ($scope, modalService, orderService, $timeout) {
        var vm = this;

        vm.orderby = 'product';
        vm.reverse = false;
        vm.ordersTotal = 0.00;
        vm.customer;

        vm.setOrder = function (orderby) {
            if (orderby === vm.orderby) {
                vm.reverse = !vm.reverse;
            }
            vm.orderby = orderby;
        };

        function loadData() {
        	//Load order endpoint
            if (!AppConstant.ORDER_ENDPOINT_LOADED) {
				orderService.init().then(function(){
				},
				function(){
					console.log(ErrorCode.ERROR_INIT_ENDPOINT_SERVICE);
				});
			} 
            
            if ($scope.customer) {
                vm.customer = $scope.customer;
                updateTotal($scope.customer);
            }
            else {
                $scope.$on('customer', function (event, customer) {
                    vm.customer = customer;
                    updateTotal(customer);
                });
            }
        }

        function updateTotal(customer) {
            var total = 0.00;
            for (var i = 0; i < customer.orders.length; i++) {
                var order = customer.orders[i];
                total += order.orderTotal;
            }
            vm.ordersTotal = total;
        }
        
        vm.deleteOrder = function(id, product) {
            var modalOptions = {
                closeButtonText: 'Cancel',
                actionButtonText: 'Delete Order',
                headerText: 'Delete ' + product + '?',
                bodyText: 'Are you sure you want to delete this Order?'
            };

            modalService.showModal({}, modalOptions).then(function (result) {
                if (result === 'ok') {
                	orderService.deleteOrder(id).then(function () {
                        //onRouteChangeOff(); //Stop listening for location changes
                        //$location.path('/customers');
                		$scope.$parent.vm.loadData();
                    }, processError);
                }
            });
        }
        
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
        
        loadData();
    };

    OrderChildController.$inject = injectParams;

    angular.module('customersApp').controller('OrderChildController', OrderChildController);

}());