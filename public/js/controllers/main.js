
app.controller('MainCtrl', function($scope, $http){
	$scope.startups = [];

	var page = 1;
	$http.get('/api/startups/' + page).then(function(res){
		$scope.startups = res.data;
	});

	$scope.loadMoreStartups = function(){
		console.log('loadMoreStartups fired!');
		page++;
		$http.get('/api/startups/' + page).then(function(res){
			console.log(res);
			for(var i = 0, len = res.data.length; i < len; i++){
				$scope.startups.push(res.data[i]);
			}
		});
	};
	
});