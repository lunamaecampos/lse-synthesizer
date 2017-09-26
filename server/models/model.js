var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = new mongoose.Schema({
	name: {type: String, required:true},
	email: {type:String, required: true, unique: true},
	password: {type: String, required: true}
}, {timestamps:true})

mongoose.model('User', UserSchema);

var PatchSchema = new mongoose.Schema({
    user:{type: Schema.Types.ObjectId, ref: 'User'},
    patch_name:{type: String, required:true},
    waveform:{type: String},
	slforate:{type: Number},
	slfodelay:{type: Number},
    svcffreq:{type: Number},
    svcfres:{type: Number},
    senvatk:{type: Number},
    senvdcy:{type: Number},
    senvsus:{type: Number},
    senvrls:{type: Number},
	shpffreq:{type: Number},
	svcalevel:{type: Number},
	chorus: {type: String}
}, {timestamps: true});
mongoose.model('Patch', PatchSchema)
