(function () {

    var injectParams = ['$scope','$routeParams', '$window', 'dataService', '$location'];

    var CustomerOrdersController = function ($scope, $routeParams, $window, dataService, $location) {
        var vm = this,
            customerId = ($routeParams.customerId) ? parseInt($routeParams.customerId) : 0;

        vm.customer = {};
        vm.ordersTotal = 0.00;

        function init() {
        	if (customerId > 0) {
                dataService.getCustomer(customerId)
                .then(function (customer) {
                    vm.customer = customer;
                    $scope.$broadcast('customer', customer);
                }, function (error) {
                    $window.alert("Sorry, an error occurred: " + error.message);
                });
            }
        }
        
        vm.loadData = function() {
        	init();
        };
        
        vm.navigate = function (url) {
        	url = url + '/' + vm.customer.id;
            $location.path(url);
        };
        
        init();
        
    };

    CustomerOrdersController.$inject = injectParams;

    angular.module('customersApp').controller('CustomerOrdersController', CustomerOrdersController);

}());