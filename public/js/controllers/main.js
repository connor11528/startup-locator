
app.controller('MainCtrl', function($scope, $http, store, user, $rootScope){
	$scope.startups = store.get('startups') || [];
	$scope.currentPage = 1;

	var current_user = store.get('sl-auth-user') || false;
	console.log(current_user)

	// initially load startups
	if($scope.startups.length == 0){

		$http.get('/api/startups/' + $scope.currentPage).then(function(res){
			$scope.startups = res.data;
			store.set('startups', res.data);

			// check for favorites if logged in
			if(current_user){

				for(var i = 0, len = $scope.startups.length; i < len; i++){
					var userFavorite = _.includes(current_user.favorites, $scope.startups[i]);
					
					$scope.startups[i].favorited = (userFavorite) ? true : false;
					console.log($scope.startups[i]);	
				}
			}

		});
	}

	$scope.addFavorite = function(angellist_id, index){
		var user_id = current_user['_id'];

		if(user_id){

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
		var user_id = current_user['_id'];

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

	$scope.showConcept = function(startup){
		startup.conceptShown = true;
	};

	$scope.showDescription = function(startup){
		startup.descriptionShown = true;
	};

	$scope.hideDescription = function(startup){
		startup.descriptionShown = false;
	};

	$scope.loadMoreStartups = function(){
		$scope.loadingMore = true;
		$scope.currentPage++;

		$http.get('/api/startups/' + $scope.currentPage).then(function(res){
			for(var i = 0, len = res.data.length; i < len; i++){
				$scope.startups.push(res.data[i]);

				// check for favorites
				if(current_user){
					var userFavorite = _.includes(current_user.favorites, res.data[i]);

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
	};
	
});