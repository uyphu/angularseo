(function () {

    var injectParams = ['$q', '$rootScope'];

    var authFactory = function ($q, $rootScope) {
            factory = {
                loginPath: '/login',
                user: {
                    isAuthenticated: false,
                    roles: null
                }
            };

        factory.init = function() {
//		    var hwdefer=$q.defer();
//		    var oauthloaddefer=$q.defer();
//		    var oauthdefer=$q.defer();
//		    if (!AppConstant.USER_LOGIN_ENDPOINT_LOADED) {
//		    	gapi.client.load('userloginendpoint', AppConstant.ENDPOINT_VERSION, function() {
//					AppConstant.USER_LOGIN_ENDPOINT_LOADED = true;
//					hwdefer.resolve(gapi);
//				}, AppConstant.ROOT_API);
//			}
//			gapi.client.load(AppConstant.OAUTH2, AppConstant.OAUTH2_VERSION, function(){
//				oauthloaddefer.resolve(gapi);
//			});
//			var chain=$q.all([hwdefer.promise,oauthloaddefer.promise]);
//			return chain;
        	return CloudUtils.prototype.loadUserLoginClouds($q);
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
        
        factory.login = function (email, password) {
            var loggedIn = false;
			var p=$q.defer();
			var requestData = {};
			requestData.userName = email;
			requestData.password = password;
			gapi.client.userloginendpoint.login(requestData).execute(function(resp) {
                if (resp != null) {
                	loggedIn = true;
                	changeAuth(loggedIn);
				}
				p.resolve(loggedIn);
			});
			return p.promise;
        };

        factory.logout = function () {
        	var loggedIn = false;
			var p=$q.defer();
			var requestData = {};
			requestData.email = 'email';
			requestData.password = 'password';
			gapi.client.userloginendpoint.logout(requestData).execute(function(resp) {
                return loggedIn;
                if (resp != null) {
                	loggedIn = false;
                	changeAuth(loggedIn);
				}
				p.resolve(loggedIn);
			});
			return p.promise;
        };

        factory.redirectToLogin = function () {
            $rootScope.$broadcast('redirectToLogin', null);
        };

        function changeAuth(loggedIn) {
            factory.user.isAuthenticated = loggedIn;
            $rootScope.$broadcast('loginStatusChanged', loggedIn);
        }

        return factory;
    };

    authFactory.$inject = injectParams;

    angular.module(AppConstant.APP_NAME).factory('authService', authFactory);

}());

