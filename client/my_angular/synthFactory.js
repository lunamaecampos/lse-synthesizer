app.factory('SynthFactory', ['$location', '$http', function($location, $http){
	var factory = {};
	factory.register = function(user){
		$http({
			url: '/register',
			method: 'POST',
			data: user
		}).then(function(res){
			// console.log(res);
			$location.url('/home')
		}, function(res){
			console.log(res);
		})
	};
	factory.getUser = function(callback){
		$http({
			url: '/user',
			method: 'GET'
		}).then(function(res){
			callback(res.data);
		}, function(res){
			console.log(res);
		})
	};
	factory.login = function(user){
		$http({
			url:'/login',
			method: 'POST',
			data: user
		}).then(function(res){
			$location.url('/home')
		}, function(res){
			console.log(res);
		})
	};
	// factory.deletePatch = function(id, callback){
	// 	$http({
	// 		url: '/patches/' + id,
	// 		method: 'DELETE'
	// 	}).then(function(res){
	// 		callback();
	// 	})
	// };
	factory.createPatch = function(patch, callback){
		console.log('printing data in the factory ', patch)
		$http({
			url:'/patch',
			method: 'POST',
			data: patch
		}).then(function(res){
			callback();
			window.location.reload();
		}, function(res){
			console.log(res);
		})
	};
	factory.getYourPatches = function(callback){
		$http({
			url: '/patches',
			method: 'GET'
		}).then(function(res){
			// console.log(res);
			callback(res.data);
		}, function(res){
			console.log(res);
		})
	};
	factory.getTheirPatches = function(callback){
		$http({
			url: '/all_patches',
			method: 'GET'
		}).then(function(res){
			console.log(res);
			callback(res.data);
		}, function(res){
			console.log(res);
		})
	};
	factory.currentSetting = function(id,callback){
	//   console.log(patch);
	  $http({
		url: '/patches/' + id,
		method: 'GET',
	  }).then(function(res){
		// console.log(res);
		callback(res.data)
	})
	};
	return factory;
}])
