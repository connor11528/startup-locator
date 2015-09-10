
app.controller('StartupsCtrl', function($scope, FBURL, $firebaseArray){
	var ref = new Firebase(FBURL);
	$scope.startupList = $firebaseArray(ref);

	$scope.newStartup = { name: '', address: '' };

	$scope.addStartup = function(){
		$scope.startupList.$add($scope.newStartup);
		$scope.newStartup = {};
	}
});