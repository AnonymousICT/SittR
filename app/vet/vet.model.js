const mongoose = require('mongoose');
const Joi = require('joi');

const vetSchema = new mongoose.Schema({
	user: {type: mongoose.Schema.Types.ObjectId, ref:'user'},
	vetName: {type: String},
	vetAddress: {type:String},
	vetPhone: {type:String}
})

vetSchema.methods.serialize = function () {
	let user;

	if (typeof this.user.serialize === 'function') {
		user = this.user.serialize();
	} else {
		user = this.user;
	}
	return {
		vetId: this._id,
		user: user,
		vetName: this.vetName,
		vetAddress: this.vetAddress,
		vetPhone: this.vetPhone
	};
};

const VetJoiSchema = Joi.object().keys({
	user: Joi.string().optional(),
	vetName: Joi.string().optional(),
	vetAddress: Joi.string().optional(),
	vetPhone: Joi.string().optional()
})

const Vet = mongoose.model('vet' , vetSchema);

module.exports = { Vet, VetJoiSchema }