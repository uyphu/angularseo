/**
 * cloudUtils.js
 * Author: Phu
 * Date: Apr 10, 2015
 */

'use strict';

var CloudUtils = function() {}

//Loads all clouds.
//CloudUtils.prototype.loadClouds = function ($q) {
//	
//	if (!AppConstant.ALL_ENDPOINT_LOADED) {
//		var hwdefer=$q.defer();
//	    var oauthloaddefer=$q.defer();
//	    var oauthdefer=$q.defer();
//	    if (!AppConstant.CUSTOMER_ENDPOINT_LOADED) {
//	    	gapi.client.load('customerendpoint', AppConstant.ENDPOINT_VERSION, function() {
//				AppConstant.CUSTOMER_ENDPOINT_LOADED = true;
//				hwdefer.resolve(gapi);
//				console.log('customerendpoint loaded: ' + AppConstant.CUSTOMER_ENDPOINT_LOADED);
//				if (--AppConstant.ENDPOINT_LOADED_NUM == 0) {
//					console.log('Loaded all clouds.');
//					AppConstant.ALL_ENDPOINT_LOADED = true;
//				}
//				
//			}, AppConstant.ROOT_API);
//	    }
//	    if (!AppConstant.USER_LOGIN_ENDPOINT_LOADED) {
//	    	console.log('loaded: ' + AppConstant.USER_LOGIN_ENDPOINT_LOADED);
//	    	hwdefer.resolve(gapi);
//	    	gapi.client.load('userloginendpoint', AppConstant.ENDPOINT_VERSION, function() {
//				AppConstant.USER_LOGIN_ENDPOINT_LOADED = true;
//				console.log('userloginendpoint loaded: ' + AppConstant.USER_LOGIN_ENDPOINT_LOADED);
//				if (--AppConstant.ENDPOINT_LOADED_NUM == 0) {
//					console.log('Loaded all clouds.');
//					AppConstant.ALL_ENDPOINT_LOADED = true;
//				}
//				
//			}, AppConstant.ROOT_API);
//		}
//	    if (!AppConstant.STATE_ENDPOINT_LOADED) {
//	    	gapi.client.load('stateendpoint', AppConstant.ENDPOINT_VERSION, function() {
//				AppConstant.STATE_ENDPOINT_LOADED = true;
//				hwdefer.resolve(gapi);
//				console.log('stateendpoint loaded: ' + AppConstant.STATE_ENDPOINT_LOADED);
//				if (--AppConstant.ENDPOINT_LOADED_NUM == 0) {
//					console.log('Loaded all clouds.');
//					AppConstant.ALL_ENDPOINT_LOADED = true;
//				}
//				
//			}, AppConstant.ROOT_API);
//		}
//		
//		gapi.client.load(AppConstant.OAUTH2, AppConstant.OAUTH2_VERSION, function(){
//			oauthloaddefer.resolve(gapi);
//		});
//		var chain=$q.all([hwdefer.promise,oauthloaddefer.promise]);
//		
//		return chain;
//	}
//	
//}

CloudUtils.prototype.loadCustomerClouds = function ($q) {
	
	if (!AppConstant.ALL_ENDPOINT_LOADED) {
		var hwdefer=$q.defer();
	    var oauthloaddefer=$q.defer();
	    var oauthdefer=$q.defer();
	    
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
	    }
	   
		var chain=$q.all([hwdefer.promise,oauthloaddefer.promise]);
		
		return chain;
	}
	
}

CloudUtils.prototype.loadUserLoginClouds = function ($q) {
	
	if (!AppConstant.ALL_ENDPOINT_LOADED) {
		var hwdefer=$q.defer();
	    var oauthloaddefer=$q.defer();
	    var oauthdefer=$q.defer();
	    
	    if (!AppConstant.USER_LOGIN_ENDPOINT_LOADED) {
	    	console.log('loaded: ' + AppConstant.USER_LOGIN_ENDPOINT_LOADED);
	    	hwdefer.resolve(gapi);
	    	gapi.client.load('userloginendpoint', AppConstant.ENDPOINT_VERSION, function() {
				AppConstant.USER_LOGIN_ENDPOINT_LOADED = true;
				console.log('userloginendpoint loaded: ' + AppConstant.USER_LOGIN_ENDPOINT_LOADED);
				if (--AppConstant.ENDPOINT_LOADED_NUM == 0) {
					console.log('Loaded all clouds.');
					AppConstant.ALL_ENDPOINT_LOADED = true;
				}
				
			}, AppConstant.ROOT_API);
		}
	   
		var chain=$q.all([hwdefer.promise,oauthloaddefer.promise]);
		
		return chain;
	}
	
}

CloudUtils.prototype.loadOAuth2Clouds = function ($q) {
	
	if (!AppConstant.ALL_ENDPOINT_LOADED) {
		var hwdefer=$q.defer();
	    var oauthloaddefer=$q.defer();
	    var oauthdefer=$q.defer();
	    
		if (!AppConstant.OAUTH2_ENDPOINT_LOADED) {
			gapi.client.load(AppConstant.OAUTH2, AppConstant.OAUTH2_VERSION, function(){
				AppConstant.OAUTH2_ENDPOINT_LOADED = true;
				oauthloaddefer.resolve(gapi);
			});
		}
		
		var chain=$q.all([hwdefer.promise,oauthloaddefer.promise]);
		
		return chain;
	}
	
}