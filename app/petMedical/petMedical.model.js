const mongoose = require('mongoose');
const Joi = require('joi');

const petMedicalSchema = new mongoose.Schema({
	user: {type: mongoose.Schema.Types.ObjectId, ref:'user'},
	//required dog vaccines
	dapp: {type: Boolean, required: true},
	rabies: {type: Boolean, required: true},
	leptospirosis: {type: Boolean, required: true},
	lyme: {type: Boolean, required: true},
	canineInfluenza: {type: Boolean, required: true},
	bordetella: {type: Boolean, required: true},
	//required medicine
	fleas: {type: Boolean, required: true},
	ticks: {type: Boolean, required: true},
	heartworm: {type: Boolean, required: true},
	other: {type:String}
})

petMedicalSchema.methods.serialize = function () {
	let user;

	if (typeof this.user.serialize === 'function') {
		user = this.user.serialize();
	} else {
		user = this.user;
	}
	return {
		id: this._id,
		user: user,
		dapp: this.dapp,
		rabies: this.rabies,
		leptospirosis: this.leptospirosis,
		lyme: this.lyme,
		canineInfluenza: this.canineInfluenza,
		bordetella: this.bordetella,
		fleas: this.fleas,
		ticks: this.ticks,
		heartworm: this.heartworm,
		other: this.other
	};
};

const PetMedicalJoiSchema = Joi.object().keys({
	user: Joi.string().optional(),
	dapp: Joi.boolean().required(),
	rabies: Joi.boolean().required(),
	leptospirosis: Joi.boolean().required(),
	lyme: Joi.boolean().required(),
	canineInfluenza: Joi.boolean().required(),
	bordetella: Joi.boolean().required(),
	fleas: Joi.boolean().required(),
	ticks: Joi.boolean().required(),
	heartworm: Joi.boolean().required(),
	other: Joi.string().optional()
})

const PetMedical = mongoose.model('PetMedical' , petMedicalSchema);

module.exports = { PetMedical, PetMedicalJoiSchema }