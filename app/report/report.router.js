//for a later feature


const express = require('express');
const Joi = require('joi');
const reportRouter = express.Router();

const { HTTP_STATUS_CODES } = require('../config.js');
const { jwtPassportMiddleware } = require('../auth/auth.strategy');
const { Report , ReportJoiSchema } = require('./report.model.js');

reportRouter.post('/', jwtPassportMiddleware, (req, res)=> {
	const newReport = {
		visit: req.body.visit,
		// visitDesignatedUser: req.body.visitDesignatedUser,
		reportStatus: req.body.reportStatus,
		reportSummary: req.body.reportSummary,
		reportExtraCosts: req.body.reportExtraCosts,
		reportReceipt: req.body.reportReceipt
	};
	const validation = Joi.validate(newReport, ReportJoiSchema);
	if (validation.error) {
		return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({error: validation.error});
	}

	Report.create(newReport)
		.then(createdReport => {
			return res.status(HTTP_STATUS_CODES.CREATED).json(createdReport.serialize());
		})
		.catch(error => {
			return res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json(error);
		});
});

//retrieve all reports
reportRouter.get('/:visitid', jwtPassportMiddleware, (req,res)=> {
	Report.find({visit:req.params.visitid})
		.populate('visit')
		.then(reports => {
			return res.status(HTTP_STATUS_CODES.OK).json(reports.map(report => report.serialize())
			);
		})
		.catch(error => {
			return res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json(error);
		});
});

//retrieve specific report by id
reportRouter.get('/:reportid', (req, res) => {
	Report.findById(req.params.reportid)
	.populate('visit')
	.then(report => {
            return res.status(HTTP_STATUS_CODES.OK).json(pet.serialize());
        })
        .catch(error => {
            return res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json(error);
        });
})

//update report by id
reportRouter.put('/:reportid', jwtPassportMiddleware, (req, res)=> {
	const reportUpdate = {
		reportStatus: req.body.reportStatus,
		reportSummary: req.body.reportSummary,
		reportExtraCosts: req.body.reportExtraCosts,
		reportReceipt: req.body.reportReceipt
	}
	const validation = Joi.validation(reportUpdate, ReportJoiSchema);
    if (validation.error) {
        return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({ error:validation.error });
    }
    Report.findByIdAndUpdate(req.params.reportid, reportUpdate)
    	.then(()=>{
    		return res.status(HTTP_STATUS_CODES.NO_CONTENT).end();
    	})
    	.catch(error => {
    		return res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json(error);
    	});
});

//delete report by id
reportRouter.delete('/:reportid', jwtPassportMiddleware, (req, res) => {
	Report.findByIdAndDelete(req.params.reportid)
		.then(()=>{
			return res.status(HTTP_STATUS_CODES.NO_CONTENT).end();
		})
		.catch(error => {
            return res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json(error);
        });
});

module.exports = { reportRouter };