const mongoose = require('mongoose');
const Joi = require('joi');


const petSchema = new mongoose.Schema({
	user: {type: mongoose.Schema.Types.ObjectId, ref:'user'},
	petName: { type: String, required: true },
	petType: { type: String, required: true }
})

petSchema.methods.serialize = function () {
	let user;

	if (typeof this.user.serialize === 'function') {
		user = this.user.serialize();
	} else {
		user = this.user;
	}
	return {
		id: this._id,
		user: user,
		petName: this.petName,
		petType: this.petType,
	};
};

const PetJoiSchema = Joi.object().keys({
	user: Joi.string().optional(),
	petName: Joi.string().min(1).required(),
	petType: Joi.string().min(1).required(),
})

const Pet = mongoose.model('Pet', petSchema);

module.exports = { Pet, PetJoiSchema }