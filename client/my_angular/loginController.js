app.controller('LoginController', ['$scope', '$location', 'SynthFactory', function($scope, $location, SynthFactory){
	$scope.login = function(user){
		SynthFactory.login(user);
	}
}])
