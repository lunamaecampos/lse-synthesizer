app.controller('HomeController', ['$scope', '$location', 'SynthFactory', '$routeParams', function($scope, $location, SynthFactory, $routeParams){
	function getUser(){
		SynthFactory.getUser(function(data){
			$scope.user = data;
		});
	}
	getUser();

	function getYourPatches(){
		SynthFactory.getYourPatches(function(data){
			$scope.patches = data;
		})
	}
	getYourPatches();

	function getTheirPatches(){
		SynthFactory.getTheirPatches(function(data){
			$scope.patches = data;
		})
	}
	getTheirPatches();

	$scope.createPatch = function(patch){
		SynthFactory.createPatch(patch, getYourPatches);
		$scope.newPatch = {};
	}
	$scope.currentSetting =function(id){
		// console.log(id);
	  SynthFactory.currentSetting(id, function(data){
		$scope.currentConfig = data;
	  })
	}
	// getCurrentSetting()
	// show($routeParams.id);
	// $scope.editPatch = function(patch, id){
	//   synthFactory.edit(patch, id);
	// }
	// $scope.deletePatch = function(id){
	// 	SynthFactory.deletePatch(id, getPatch);
	// }
}])
