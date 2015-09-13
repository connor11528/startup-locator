
app.controller('MainCtrl', function($scope, $http, store, user, $rootScope){
	$scope.startups = store.get('startups') || [];
	$scope.currentPage = 1;

	// initially load startups
	if($scope.startups.length == 0){

		$http.get('/api/startups/' + $scope.currentPage).then(function(res){
			var startups = res.data.startups;

			$scope.startups = startups;
			store.set('startups', startups);

			// check for favorites if logged in
			if($rootScope.user){

				for(var i = 0, len = $scope.startups.length; i < len; i++){
					var userFavorite = _.includes($rootScope.user.favorites, $scope.startups[i]);
					
					$scope.startups[i].favorited = (userFavorite) ? true : false;
				}
			}

		});
	}

	$scope.addFavorite = function(angellist_id, index){
		
		if($rootScope.user){

			var user_id = $rootScope.user['_id'];

			$http.get('/api/favorite/' + angellist_id, {
				params: { user_id: user_id }
			}).then(function(res){
				
				$scope.startups[index].favorited = true;

				store.set('sl-auth-user', res.data);
				store.set('startups', $scope.startups);
			});
		} else {
			alert('You must be logged in for that!');
		}
	};

	$scope.removeFavorite = function(angellist_id, index){
		var user_id = $rootScope.user['_id'];

		if(user_id){

			$http.get('/api/unfavorite/' + angellist_id, {
				params: { user_id: user_id }
			}).then(function(res){
				$scope.startups[index].favorited = false;

				store.set('sl-auth-user', res.data);
				store.set('startups', $scope.startups);
			});
		} else {
			alert('You must be logged in for that!');
		}
	};

	$scope.toggleConcept = function(startup){
		startup.conceptShown = (startup.conceptShown) ? false : true;
		store.set('startups', $scope.startups);
	};

	$scope.showDescription = function(startup){
		startup.descriptionShown = true;
	};

	$scope.hideDescription = function(startup){
		startup.conceptShown = false;
		startup.descriptionShown = false;
		console.log(startup)
	};

	$scope.loadMoreStartups = function(){
		$scope.loadingMore = true;
		$scope.currentPage++;

		$http.get('/api/startups/' + $scope.currentPage).then(function(res){
			var startups = res.data.startups;
			console.log(startups);
			for(var i = 0, len = startups.length; i < len; i++){
				$scope.startups.push(startups[i]);

				// check for favorites
				if($rootScope.user){
					var userFavorite = _.includes($rootScope.user.favorites, startups[i]);

					$scope.startups[i].favorited = (userFavorite) ? true : false;
				}
			}
			$scope.loadingMore = false;
		});
	};

	$scope.logout = function(){
		user.logout();
		$rootScope.user = false;

		// unfavorite everything
		for(var i = 0, len = $scope.startups.length; i < len; i++){
			$scope.startups[i].favorited = false;
		}
		store.set('startups', $scope.startups);
	};
	
});