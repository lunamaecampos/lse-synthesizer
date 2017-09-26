var mongoose = require('mongoose');
var User = mongoose.model('User');
var Patch = mongoose.model('Patch');

var bcrypt = require('bcryptjs');

module.exports = {
	register: function(req, res){
		var salt = bcrypt.genSaltSync(10);
		if(req.body.password == req.body.password_confirmation){
			var hash = bcrypt.hashSync(req.body.password, salt);
			var user = new User({name: req.body.name, email:req.body.email, password: hash});
			user.save(function(err, data){
				if(err){
					res.status(400).send(err);
				}
				else{
					req.session.user = data;
					res.sendStatus(200);
				}
			})
		}
	},
	login: function(req, res){
		User.findOne({email: req.body.email}, function(err, user){
			if(err){
				res.status(400).send(err);
			}
			else{
				if(bcrypt.compareSync(req.body.password, user.password)){
					req.session.user = user;
					res.sendStatus(200);
				}
			}
		})
	},
	logout: function(req, res){
		req.session.destroy();
		res.redirect('/');
	},
	loggedUser: function(req, res){
		res.json(req.session.user);
	},
	all: function(req, res){
		User.find({}, function(err, data){
			res.json(data);
		})
	},
	// delete: function(req,res){
	//     Patch.findOne({_id:req.params.id}, function(err,data){
	//           if(data == null){
	//               res.status(400).send("No patch found.")
	//           }
	//           else {
	//               data.remove();
	//               res.status(200).send("Patch was deleted.");
	//           }
	//     })
	// },
	getYourPatches: function(req, res){
		Patch.find({_id:req.params.id}).exec(function(err, data){
			if(err){
				res.status(400).send("Problem getting your patches.")
			}
			else{
				res.json(data);
			}
		})
	},
	getTheirPatches: function(req, res){
		Patch.find({}).populate('user').exec(function(err, data){
			if(err){
				res.status(400).send("Problem getting all the patches.")
			}
			else{
				res.json(data);
			}
		})
	},
	createPatch: function(req, res){
		var patch = new Patch(req.body);
		patch.user = req.session.user._id;
		patch.save(function(err, data){
			if(err){
				res.status(400).send("Problem saving patch");
			}
			else{
				res.sendStatus(200);
			}
		})
	},
	currentSetting: function(req,res){
	  Patch.findOne({_id: req.params.id}, req.body, function(err, data){
		if(err){
		  console.log(err);
		  res.status(400).send("Problem updating patch");
		}else res.json(data);
	  })
	},
}
