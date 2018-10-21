const express = require('express');
const Joi = require('joi');
const visitRouter = express.Router();

const { HTTP_STATUS_CODES } = require('../config.js');
const { jwtPassportMiddleware } = require('../auth/auth.strategy');
const { Visit, VisitJoiSchema } = require('./pet.model.js');

visitRouter.post('/', jwtPassportMiddleware, (req, res) => {
	const newVisit = {
		user:req.user.id,
		visitCreationDate: req.body.visitCreationDate,
		visitDateStart: req.body.visitDateStart,
		visitDateEnd: req.body.visitDateEnd,
		visitLocation: req.body.visitLocation,
		visitPrice: req.body.visitPrice,
		visitCareInstructions: req.body.visitCareInstructions,
		visitSummary: req.body.visitSummary
	};
	const validation = Joi.validate(newVisit, VisitJoiSchema);
	if(validation.error) {
		return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({error: validation.error});
	}
	Visit.create(newVisit)
		.then(createdVisit => {
			return res.status(HTTP_STATUS_CODES.CREATED).json(createdVisit.serialize());
		})
		.catch(error => {
			return res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json(error);
		});
});
//retrieve the user's visit plan
visitRouter.get('/', jwtPassportMiddleware, (req, res) => {
	Visit.find({user: req.user.id})
		.populate('user')
        .then(visits => {
            return res.status(HTTP_STATUS_CODES.OK).json(
                visits.map(visit => visit.serialize())
            );
        })
        .catch(error => {
            return res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json(error);
        });
});

//retrieve all of the user's visit plans
visitRouter.get('/', jwtPassportMiddleware, (req, res) => {
	visit.find()
		.populate('user')
		.then(visits => {
			return res.status(HTTP_STATUS_CODES.OK).json(visits.map(visit => visit.serialize())
			);
		})
		.catch(error => {
			return res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json(error);
		});
});

visitRouter.get('/:visitid', (req, res) => {
	Visit.findByID(req.params.visitid)
		.populate('user')
		.then(visit => {
			return res.status(HTTP_STATUS_CODES.OK).json(visit.serialize());
		})
		.catch(error => {
			return res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json(error);
		});
});

visitRouter.put('/:visitid', jwtPassportMiddleware, (req, res)=> {
	const visitUpdate = {
		visitCreationDate: req.body.visitCreationDate,
		visitDateStart: req.body.visitDateStart,
		visitDateEnd: req.body.visitDateEnd,
		visitLocation: req.body.visitLocation,
		visitPrice: req.body.visitPrice,
		visitCareInstructions: req.body.visitCareInstructions,
		visitSummary: req.body.visitSummary
	}
	const validation = Joi.validation(visitUpdate, VisitJoiSchema);
	if (validation.error) {
		return res.status(HTTP_STATUS_CODES.NO_CONTENT).end();
	}
	Visit.findByIDAndUpdate(req.params.visitid, visitUpdate)
        .then(()=>{
            return res.status(HTTP_STATUS_CODES.NO_CONTENT).end();
        })
        .catch(error => {
            return res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json(error);
        });
});

visitRouter.delete('/:visitid', jwtPassportMiddleware, (req, res) => {
	Visit.findByIDAndDelete(req.params.visitid)
        .then(() => {
            return response.status(HTTP_STATUS_CODES.NO_CONTENT).end();
        })
        .catch(error => {
            return response.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json(error);
        });
})

module.exports = { visitRouter };