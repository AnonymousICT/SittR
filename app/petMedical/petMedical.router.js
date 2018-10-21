const express = require('express');
const Joi = require('joi');
const petMedicalRouter = express.Router();

const { HTTP_STATUS_CODES } = require('../config.js');
const { jwtPassportMiddleware } = require('../auth/auth.strategy');
const { PetMedical, PetMedicalJoiSchema } = require('./petMedical.model.js');

petMedicalRouter.post('/', jwtPassportMiddleware, (req, res) => {
	const newPetMedical = {
		user: req.user.id,
		dapp: req.body.dapp,
		rabies: req.body.rabies,
		leptospirosis: req.body.leptospirosis,
		lyme: req.body.lyme,
		canineInfluenza: req.body.canineInfluenza,
		bordetella: req.body.bordetella,
		fleas: req.body.fleas,
		ticks: req.body.ticks,
		heartworm: req.body.heartworm,
		other: req.body.other
	};
	const validation = Joi.validate(newPetMedical, PetMedicalJoiSchema);
	if (validation.error) {
		return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({error: validation.error});
	}

	PetMedical.create(newPetMedical)
		.then(createdPetMedical => {
			return res.status(HTTP_STATUS_CODES.CREATED).json(createdPetMedical.serialize());
		})
		.catch(error => {
			return res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json(error);
		});
});

//retreive the pet's medical record
petMedicalRouter.get('/', jwtPassportMiddleware, (req, res) => {
	PetMedical.find({user: req.user.id})
		.populate('user')
		.then(petsMedical => {
			return res.status(HTTP_STATUS_CODES.OK).json( petsMedical.map(petMedical => petMedical.serialize())
			);
		})
		.catch(error => {
			return res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json(error);
		});
});

petMedicalRouter.put('/:petMedicalid', jwtPassportMiddleware, (req, res)=> {
	const petMedicalUpdate = {
		dapp: req.body.dapp,
		rabies: req.body.rabies,
		leptospirosis: req.body.leptospirosis,
		lyme: req.body.lyme,
		canineInfluenza: req.body.canineInfluenza,
		bordetella: req.body.bordetella,
		fleas: req.body.fleas,
		ticks: req.body.ticks,
		heartworm: req.body.heartworm,
		other: req.body.other
	}
	const validation = Joi.validation(petMedicalUpdate, PetMedicalJoiSchema);
	if (validation.error) {
		return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({ error: validation.error });
	}
	PetMedical.findByIDAndUpdate(req.params.petMedicalid, petMedicalUpdate)
        .then(()=>{
            return res.status(HTTP_STATUS_CODES.NO_CONTENT).end();
        })
        .catch(error => {
            return res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json(error);
        });
});

petMedicalRouter.delete('/:petMedicalid', jwtPassportMiddleware, (req, res) => {
	PetMedical.findByIDAndDelete(req.params.petMedicalid)
			.then(()=>{
				return res.status(HTTP_STATUS_CODES.NO_CONTENT).end();
			})
			.catch(error => {
				return res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json(error)
			})
})


module.exports = { petMedicalRouter };
