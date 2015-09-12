app.factory('user', function($http, store, API_URL){

	return {
		login: function(userCreds){
			return $http.post(API_URL + 'users/auth', {
				email: userCreds.email,
				password: userCreds.password
			}).then(logUserIn);
		},
		register: function(newUser){
			// create user
			return $http.post(API_URL + 'users', {
				email: newUser.email,
				password: newUser.password
			}).then(logUserIn);
		},
		logout: logout
	};

	// Helper functions

	function logUserIn(res){
		store.set('sl-auth-token', res.data.token);
		store.set('sl-auth-user', JSON.stringify(res.data.user));
		return res;
	}

	function logout(){
		store.set('sl-auth-token', false);
		store.set('sl-auth-user', false);
	}

});