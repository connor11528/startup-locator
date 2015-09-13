app.controller('LoginCtrl', function($rootScope, $scope, user, $state){
	$scope.userCreds = {};

	$scope.loginFields = [
		{ 
			type: 'input',
			key: 'email',
			templateOptions: {
				label: 'Email',
				type: 'email',
				placeholder: 'Valid email address',
				required: true
			}
		},
		{ 
			type: 'input',
			key: 'password',
			templateOptions: {
				label: 'Password',
				type: 'password',
				placeholder: 'Password',
				required: true
			}

		}
	];

	$scope.login = function(userCreds){
		user.login(userCreds).then(function success(res){
			// if successful, log user in
			if(res.data.success){

				$('#loginModal').modal('hide');
				$rootScope.user = res.data.user;

				// load up the favorites
				console.log($rootScope.user.favorites);
				for(var i = 0, len = $scope.$parent.startups.length; i < len; i++){
					var userFavorite = _.includes($rootScope.user.favorites, $scope.$parent.startups[i]._id);
					console.log($scope.$parent.startups[i], userFavorite);
					
					$scope.$parent.startups[i].favorited = (userFavorite) ? true : false;
				}
			}	
		}, function handleError(res){
			console.error('Error: ' + JSON.stringify(res.data));
		});
	};

	$scope.logout = function(){
		$rootScope.user = null;
		user.logout();

		// hard page refresh
		$state.go($state.current.name, $state.params, { reload: true });
	};

});