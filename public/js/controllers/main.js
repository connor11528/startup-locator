
app.controller('MainCtrl', function($scope, $http, store, user, $rootScope){
	$scope.startups = store.get('startups') || [];
	$scope.currentPage = 1;

	// initially load startups
	if($scope.startups.length == 0){

		$http.get('/api/startups/' + $scope.currentPage).then(function(res){
			$scope.startups = res.data;
			store.set('startups', res.data);
		});
	}

	$scope.showConcept = function(startup){
		startup.conceptShown = true;
	};

	$scope.showDescription = function(startup){
		console.log('showDescription')
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
			}
			$scope.loadingMore = false;
		});
	};

	$scope.logout = function(){
		user.logout();
		$rootScope.user = false;
	};
	
});