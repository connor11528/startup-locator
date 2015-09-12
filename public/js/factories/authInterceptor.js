// if the user has logged in add a special header
app.factory('authInterceptor', function(store){
	return {
		request: function(config){
			var token = store.get('sl-auth-token');
			if(token){
				// add custom header to every request when user has token
				config.headers = config.headers || {};
				config.headers['x-access-token'] = token;
			}
			return config;
		}
	};
});