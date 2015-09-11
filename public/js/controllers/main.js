
app.controller('MainCtrl', function($scope, $http, store){
	$scope.startups = store.get('startups') || [];
	$scope.currentPage = 1;

	// initially load startups
	if($scope.startups.length == 0){
		console.log('init req fired');

		$http.get('/api/startups/' + $scope.currentPage).then(function(res){
			$scope.startups = res.data;
			store.set('startups', res.data);
		});
	}

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
	
});