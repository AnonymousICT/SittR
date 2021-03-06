const express = require('express');
const Joi = require('joi');
const visitRouter = express.Router();

const { HTTP_STATUS_CODES } = require('../config.js');
const { jwtPassportMiddleware } = require('../auth/auth.strategy');
const { Visit, VisitJoiSchema } = require('./visit.model.js');


//creating a user's new visit plan
visitRouter.post('/', jwtPassportMiddleware, (req, res) => {
	// console.log('hello');
	// console.log(req.body, req.user);
	const newVisit = {
		user: req.user.id,
		pet: req.body.pet,
		timestamps: req.body.timestamps,
		visitDateStart: req.body.visitDateStart,
		visitDateEnd: req.body.visitDateEnd,
		visitLocation: req.body.visitLocation,
		visitPrice: req.body.visitPrice,
		visitCareInstructions: req.body.visitCareInstructions,
		visitSummary: req.body.visitSummary,
		visitDesignatedUser: req.body.visitDesignatedUser,
		visitAccepted: req.body.visitAccepted,
		visitInProgress: req.body.visitInProgress,
		visitCompleted: req.body.visitCompleted
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
//retreive's all visit plans regardless of authentication
visitRouter.get('/all', (req, res) => {
	Visit.find()
		.then(visits => {

			return res.status(HTTP_STATUS_CODES.OK).json(
				visits.map(visit => visit.serialize())
			);
		})
		.catch(error => {
			return res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json(error);
		})
})

//retrieve the user's visit plan
visitRouter.get('/', jwtPassportMiddleware, (req, res) => {
	console.log(req.user.id)
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

//retrieve specific visit by id
visitRouter.get('/:visitid', (req, res) => {
	Visit.findById(req.params.visitid)
		.populate('user')
		.then(visit => {
			return res.status(HTTP_STATUS_CODES.OK).json(visit.serialize());
		})
		.catch(error => {
			return res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json(error);
		});
});

//update vists by id
visitRouter.put('/:visitid', jwtPassportMiddleware, (req, res)=> {
	const visitUpdate = {
		visitDateStart: req.body.visitDateStart,
		visitDateEnd: req.body.visitDateEnd,
		visitLocation: req.body.visitLocation,
		visitPrice: req.body.visitPrice,
		visitCareInstructions: req.body.visitCareInstructions,
		visitSummary: req.body.visitSummary,
		visitDesignatedUser: req.body.visitDesignatedUser,
		visitAccepted: req.body.visitAccepted,
		visitInProgress: req.body.visitInProgress,
		visitCompleted: req.body.visitCompleted
	}
	const validation = Joi.validate(visitUpdate, VisitJoiSchema);
	if (validation.error) {
		return res.status(HTTP_STATUS_CODES.NO_CONTENT).end();
	}
	Visit.findByIdAndUpdate(req.params.visitid, visitUpdate)
        .then(()=>{
            return res.status(HTTP_STATUS_CODES.NO_CONTENT).end();
        })
        .catch(error => {
            return res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json(error);
        });
});

//delete vist plan by id
visitRouter.delete('/:visitid', jwtPassportMiddleware, (req, res) => {
	Visit.findByIdAndDelete(req.params.visitid)
        .then(() => {
            return res.status(HTTP_STATUS_CODES.NO_CONTENT).end();
        })
        .catch(error => {
            return res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json(error);
        });
})

module.exports = { visitRouter };
