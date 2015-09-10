
app.controller('MainCtrl', function($scope){

	$scope.test = [1,2,3,4];
	$scope.error = false;
	$scope.addToTest = function(){
		var sortNums = function (a, b) { 
			return a - b;
		};
		// check for zero
		if($scope.toAdd === '0'){
			$scope.test.push(0);
			$scope.test.sort(sortNums);
			$scope.error = false;
			return;
		}

		// make sure we only add numbers
		var toAdd = parseInt($scope.toAdd);

		if(typeof(toAdd) === 'number' && toAdd){
			// add to array
			$scope.test.push(toAdd);
			console.log(toAdd);
			$scope.test.sort(sortNums);
			$scope.error = false;

		} else {
			console.error('not added to array!');
			$scope.error = 'You must input a number!';
		}

		// reset input field
		$scope.toAdd = '';
	};
});