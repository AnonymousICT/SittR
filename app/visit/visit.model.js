const mongoose = require('mongoose');
const Joi = require('joi');

const visitSchema = new mongoose.Schema({
	user: {type: mongoose.Schema.Types.ObjectId, ref:'user'},
	visitCreationDate: { type: Date, default: Date.now },
	visitDateStart: { type: Date, required: true },
	visitDateEnd: {type: Date, required: true }, 
	visitLocation: { type: String, required: true },
	visitPrice: { type: Number, required: true },
	visitCareInstructions: { type: String },
	visitSummary: { type: String }
})

visitSchema.methods.serialize = function () {
	let user;

	if (typeof this.user.serialize === 'function') {
		user = this.user.serialize();
	} else {
		user = this.user;
	}
	return {
		id:this._id,
		visitCreationDate: this.visitCreationDate,
		visitDateStart: this.visitDateStart,
		visitDateEnd: this.visitDateEnd,
		visitLocation: this.visitLocation,
		visitPrice: this.visitPrice,
		visitCareInstructions: this.visitCareInstructions,
		visitSummary: this.visitSummary
	}
}

const VisitJoiSchema = Joi.object().keys({
	user: Joi.string().optional(),
	visitCreationDate: Joi.date().iso().timestamp('javascript'),
	visitDateStart: Joi.date().min('1-1-2018').iso().required(),
	visitDateEnd: Joi.date().min(Joi.ref('visitDateStart')).iso().required(),
	visitLocation: Joi.string().min(1).required(),
	visitPrice: Joi.number().min(1).required(),
	visitCareInstructions: Joi.string().optional(),
	visitSummary: Joi.string().optional(),
})

const Visit = mongoose.model('Visit', visitSchema);

module.exports = { Visit, VisitJoiSchema }

// visitCreationDate: 
// visitDateStart:
// visitDateEnd:
// visitLocation:
// visitPrice:
// visitCareInstructions:
// visitSummary:

// "visitCreationDate": "",
// "visitDate": "",
// "visitDateEnd":"",
// "visitLocation": "",
// "visitPrice": "",
// "visitCareInstructions": "",
// "visitSummary": ""