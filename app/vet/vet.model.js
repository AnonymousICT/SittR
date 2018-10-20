const mongoose = require('mongoose');
const Joi = require('joi');

const vetSchema = new mongoose.Schema({
	user: {type: mongoose.Schema.Types.ObjectId, ref:'user'},
	vetName: {type: String, required:true},
	vetAddress: {type:String, required:true},
	vetPhone: {type:String, required:true}
})

vetSchema.methods.serialize = function () {
	let user;

	if (typeof this.user.serialize === 'function') {
		user = this.user.serialize();
	} else {
		user = this.user;
	}
	return {
		id: this._id,
		user: user,
		vetName: this.vetName,
		vetAddress: this.vetAddress,
		vetPhone: this.vetPhone
	};
};

const VetJoiSchema = Joi.object().keys({
	user: Joi.string().optional(),
	vetName: Joi.string().min(1).required(),
	vetAddress: Joi.string().min(1).required(),
	vetPhone: Joi.number().min(1).required()
})

const Vet = mongoose.model('Vet' , vetSchema);

module.exports = { Vet, VetJoiSchema }