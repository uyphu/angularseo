/**
 * CustomersService.js
 * Author: Phu
 * Date: Apr 10, 2015
 */

'use strict';

/**
 * Initialize.
 */
(function (){
	
	var injectParams = ['$q'];
	
	var customersFactory = function($q) {
		var factory = {}; 
		factory.init = function() {
			if (!AppConstant.ALL_ENDPOINT_LOADED) {
				var hwdefer=$q.defer();
			    if (!AppConstant.CUSTOMER_ENDPOINT_LOADED) {
			    	gapi.client.load('customerendpoint', AppConstant.ENDPOINT_VERSION, function() {
						AppConstant.CUSTOMER_ENDPOINT_LOADED = true;
						hwdefer.resolve(gapi);
						console.log('customerendpoint loaded: ' + AppConstant.CUSTOMER_ENDPOINT_LOADED);
						if (--AppConstant.ENDPOINT_LOADED_NUM == 0) {
							console.log('Loaded all clouds.');
							AppConstant.ALL_ENDPOINT_LOADED = true;
						}
						
					}, AppConstant.ROOT_API);
			    	
			    	if (!AppConstant.STATE_ENDPOINT_LOADED) {
			    		gapi.client.load('stateendpoint', AppConstant.ENDPOINT_VERSION, function() {
							AppConstant.STATE_ENDPOINT_LOADED = true;
							hwdefer.resolve(gapi);
							console.log('stateendpoint loaded: ' + AppConstant.STATE_ENDPOINT_LOADED);
							if (--AppConstant.ENDPOINT_LOADED_NUM == 0) {
								console.log('Loaded all clouds.');
								AppConstant.ALL_ENDPOINT_LOADED = true;
							}
							
						}, AppConstant.ROOT_API);
			    	}
			    	
			    	var chain = hwdefer.promise;
					
					return chain;
			    } else {
			    	return hwdefer.promise;
			    }
			   
				//var chain=$q.all([hwdefer.promise,oauthloaddefer.promise]);
			    
			}
		}
		
		factory.doCall = function(callback) {
			var p=$q.defer();
			
			gapi.auth.authorize({client_id: AppConstant.CLIENT_ID, scope: AppConstant.SCOPE,
				immediate: true}, function(){
		       var request = gapi.client.oauth2.userinfo.get().execute(function(resp) {
			       if (!resp.code) {
			           p.resolve(gapi);
			       } else {
			           p.reject(gapi);
			       }
		       });
		   });
		   return p.promise;
		}
		
		factory.sigin = function(callback) {
			 gapi.auth.authorize({client_id: AppConstant.CLIENT_ID, scope: AppConstant.SCOPE,
	                immediate: false}, callback);
		}
		
		factory.getCustomersSummary = function (pageIndex, pageSize) {
            return getPagedResource('customersSummary', pageIndex, pageSize);
        };
		
		function getPagedResource(baseResource, pageIndex, pageSize) {
            var data = {};
			var p=$q.defer();
			var requestData = {};
			requestData.cursor = null;
			requestData.count = pageSize;
			gapi.client.customerendpoint.getCustomersSumary(requestData).execute(function(resp) {
				var custs = resp.items;
				extendCustomers(custs);
				data.results = resp.items;
				data.totalRecords = custs.length;
				p.resolve(data);
			});
			return p.promise;
        }
		
		function extendCustomers(customers) {
            var custsLen = customers.length;
            //Iterate through customers
            for (var i = 0; i < custsLen; i++) {
                var cust = customers[i];
                if (!cust.orders) continue;

                var ordersLen = cust.orders.length;
                for (var j = 0; j < ordersLen; j++) {
                    var order = cust.orders[j];
                    order.orderTotal = order.quantity * order.price;
                }
                cust.ordersTotal = ordersTotal(cust);
            }
        }
		
		factory.getCustomers = function (pageIndex, pageSize) {
            return getPagedResource('customers', pageIndex, pageSize);
        }
		
		factory.getCustomer = function (id) {
            //then does not unwrap data so must go through .data property
            //success unwraps data automatically (no need to call .data property)
			var p = $q.defer();
			var requestData = {};
			requestData.id = id;
			gapi.client.customerendpoint.getCustomer(requestData).execute(function(resp) {
				if (resp != null) {
					p.resolve(resp.result)
				}
			});
			return p.promise;
        };


        factory.getStates = function () {
        	var data = {};
			var p=$q.defer();
			var requestData = {};
			requestData.cursor = null;
			requestData.count = null;
        	gapi.client.stateendpoint.listState(requestData).execute(function(resp) {
        		console.log(resp)
        		p.resolve(resp.items);
        	});
        	return p.promise; 
        }

        factory.checkUniqueValue = function (id, property, value) {
            if (!id) id = 0;
            return $http.get(serviceBase + 'checkUnique/' + id + '?property=' + property + '&value=' + escape(value)).then(
                function (results) {
                    return results.data.status;
                });
        };

        factory.insertCustomer = function (customer) {
        	var p=$q.defer();
        	gapi.client.customerendpoint.insertCustomer(customer).execute(function(resp){
        		customer.id = resp.result.id;
        		console.log(resp)
        		p.resolve(resp.result);
        	});
        	return p.promise;
        };

        factory.newCustomer = function () {
            return $q.when({id: 0});
        };

        factory.updateCustomer = function (customer) {
        	var p=$q.defer();
        	gapi.client.customerendpoint.updateCustomer(customer).execute(function(resp){
        		customer.id = resp.result.id;
        		console.log(resp)
        		p.resolve(resp.result);
        	});
        	return p.promise;
        };

        factory.deleteCustomer = function (id) {
			var p = $q.defer();
			var requestData = {};
			requestData.id = id;
        	gapi.client.customerendpoint.removeCustomer(requestData).execute(function(status){
        		p.resolve(status.result);
        	});
        	return p.promise;
        };
        
        // is this still used???
        function orderTotal(order) {
            return order.quantity * order.price;
        };

        function ordersTotal(customer) {
            var total = 0;
            var orders = customer.orders;
            var count = orders.length;

            for (var i = 0; i < count; i++) {
                total += orders[i].orderTotal;
            }
            return total;
        };
		
		return factory;
	}
	
	customersFactory.$inject = injectParams;
	
	angular.module(AppConstant.APP_NAME).factory('customersService', customersFactory);
	
}());



