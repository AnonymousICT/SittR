//for a later feature

const mongoose = require('mongoose');
const Joi = require('joi');

const petMedicalSchema = new mongoose.Schema({
	// user: {type: mongoose.Schema.Types.ObjectId, ref:'user'},
	pet: {type: mongoose.Schema.Types.ObjectId, ref:'pet'},

	//required dog vaccines
	dapp: {type: Boolean},
	rabies: {type: Boolean},
	leptospirosis: {type: Boolean},
	lyme: {type: Boolean},
	canineInfluenza: {type: Boolean},
	bordetella: {type: Boolean},
	//required medicine
	fleas: {type: Boolean},
	ticks: {type: Boolean},
	heartworm: {type: Boolean},
	other: {type:String}
})

petMedicalSchema.methods.serialize = function () {
	// let user;

	// if (typeof this.user.serialize === 'function') {
	// 	user = this.user.serialize();
	// } else {
	// 	user = this.user;
	// }
	return {
		id: this._id,
		// user: user,
		pet: this.pet,
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
	// user: Joi.string().optional(),
	pet: Joi.string().optional(),
	dapp: Joi.boolean().optional(),
	rabies: Joi.boolean().optional(),
	leptospirosis: Joi.boolean().optional(),
	lyme: Joi.boolean().optional(),
	canineInfluenza: Joi.boolean().optional(),
	bordetella: Joi.boolean().optional(),
	fleas: Joi.boolean().optional(),
	ticks: Joi.boolean().optional(),
	heartworm: Joi.boolean().optional(),
	other: Joi.string().optional()
})

const PetMedical = mongoose.model('petMedical' , petMedicalSchema);

module.exports = { PetMedical, PetMedicalJoiSchema }