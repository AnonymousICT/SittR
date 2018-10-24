const mongoose = require('mongoose');
const Joi = require('joi');

const visitSchema = new mongoose.Schema({
	user: {type: mongoose.Schema.Types.ObjectId, ref:'user'},
	timestamps: {type: Date, default: Date.now},
	visitDateStart: { type: Date, required: true },
	visitDateEnd: {type: Date, required: true }, 
	// visitDateStart: { type: String, required: true},
	// visitDateEnd: {type: String, required: true},
	visitLocation: { type: String, required: true },
	visitPrice: { type: Number, required: true },
	visitCareInstructions: { type: String },
	visitSummary: { type: String },
	visitDesignatedUser: { type: String },
	visitAccepted: { type: Boolean },
	visitInProgress: { type: Boolean},
	visitCompleted: {type: Boolean}
});

visitSchema.methods.serialize = function () {
	let user;

	if (typeof this.user.serialize === 'function') {
		user = this.user.serialize();
	} else {
		user = this.user;
	}
	return {
		id:this._id,
		user: user,
		timestamps: this.timestamps,
		visitDateStart: this.visitDateStart,
		visitDateEnd: this.visitDateEnd,
		visitLocation: this.visitLocation,
		visitPrice: this.visitPrice,
		visitCareInstructions: this.visitCareInstructions,
		visitSummary: this.visitSummary,
		visitDesignatedUser: this.visitDesignatedUser,
		visitAccepted: this.visitAccepted,
		visitInProgress: this.visitInProgress,
		visitCompleted: this.visitCompleted
	}
}

const VisitJoiSchema = Joi.object().keys({
	user: Joi.string().optional(),
	timestamps: Joi.date().timestamp('javascript'),
	visitDateStart: Joi.date().min('1-1-2018').required(),
	visitDateEnd: Joi.date().min(Joi.ref('visitDateStart')).required(),
	// visitDateStart: Joi.string().min(1).required(),
	// visitDateEnd: Joi.string().min(1).required(),
	visitLocation: Joi.string().min(1).required(),
	visitPrice: Joi.number().min(1).required(),
	visitCareInstructions: Joi.string().optional(),
	visitSummary: Joi.string().optional(),
	visitDesignatedUser: Joi.string().optional(),
	visitAccepted: Joi.boolean().optional(),
	visitInProgress: Joi.boolean().optional(),
	visitCompleted: Joi.boolean().optional()

})

const Visit = mongoose.model('visit', visitSchema);

module.exports = { Visit, VisitJoiSchema }
