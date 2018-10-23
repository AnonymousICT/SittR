const mongoose = require('mongoose');
const Joi = require('joi');

const reportSchema = new mongoose.Schema({
	visit: {type: mongoose.Schema.Types.ObjectId, ref: "visit"} ,
	// reportDate: timestamp and I don't know how to do it
	reportStatus: {type: Number, required: true},
	reportSummary: {type: String, required: true},
	reportExtraCosts: {type: Number},
	reportReceipt:{type: String} //url string
});

reportSchema.methods.serialize = function () {
	return {
		id: this._id,
		visit: this.visit,
		reportStatus: this.reportStatus,
		reportSummary: this.reportSummary,
		reportExtraCosts: this.reportExtraCosts,
		reportReceipt: this.reportReceipt
	};
};

const ReportJoiSchema = Joi.object().keys({
	visit: Joi.string().optional(),
	reportStatus: Joi.number().required(),
	reportSummary: Joi.string().required(),
	reportExtraCosts: Joi.number().optional(),
	reportReceipt: Joi.string().optional()
});

const Report = mongoose.model('report', reportSchema);

module.exports = { Report , ReportJoiSchema }