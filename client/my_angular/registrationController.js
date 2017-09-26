app.controller('RegistrationController', ['$scope', '$location', 'SynthFactory', function($scope, $location, SynthFactory){
	$scope.register = function(user){
		SynthFactory.register(user);
	}
}])
