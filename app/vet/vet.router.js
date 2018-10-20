const express = require('express');
const Joi = require('joi');
const vetRouter = express.Router();

const { HTTP_STATUS_CODES } = require('../config.js');
const { jwtPassportMiddleware } = require('../auth/auth.strategy');
const { Vet, VetJoiSchema } = require('./vet.model.js');

//create the user's vet
vetRouter.post('/', jwtPassportMiddleware, (req, res) => {
	const newVet = {
		user: req.user.id,
		vetName: req.body.vetName,
		vetAddress: req.body.vetAddress,
		vetPhone: req.body.vetPhone
	};
	const validation = Joi.validate(newVet, VetJoiSchema);
	if (validation.error) {
        return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({error: validation.error});
    }
    Vet.create(newVet)
    	.then(createdVet => {
    		return res.status(HTTP_STATUS_CODES.CREATED).json(createdVet.serialize());
    	})
    	.catch(error => {
            return res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json(error);
        }); 
});

//retreive the user's vet
vetRouter.get('/', jwtPassportMiddleware, (req, res) => {
    Vet.find({user: req.user.id})
        .populate('user')
        .then(vets => {
            return res.status(HTTP_STATUS_CODES.OK).json(
                vets.map(vet => vet.serialize())
            );
        })
        .catch(error => {
            return res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json(error);
        });
});

//retreiving all of the user's vets
vetRouter.get('/vets', (req, res)=>{
    vet.find()
        .populate('user')
        .then(vets => {
            return res.status(HTTP_STATUS_CODES.OK).json(vets.map(vet => vet.serialize())
            );
        })
        .catch(error => {
            return res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json(error);
        });
});

//retrieve svecific vet by id
vetRouter.get('/:vetid', (req, res) => {
    Vet.findByID(req.params.vetid)
        .populate('user')
        .then(vet => {
            return res.status(HTTP_STATUS_CODES.OK).json(vet.serialize());
        })
        .catch(error => {
            return res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json(error);
        });
});

//update vet by id
vetRouter.put('/:vetid', jwtPassportMiddleware, (req, res) => {
	const vetUpdate = {
		vetName: req.body.vetName,
		vetAddress: req.body.vetAddress,
		vetPhone: req.body.vetPhone
	}
	const validation = Joi.validation(vetUpdate, VetJoiSchema);
    if (validation.error) {
        return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({ error:validation.error });
    }
    Vet.findByIDAndUpdate(req.params.vetid, vetUpdate)
        .then(()=>{
            return res.status(HTTP_STATUS_CODES.NO_CONTENT).end();
        })
        .catch(error => {
            return res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json(error);
        });
});

vetRouter.delete(':/vetid', jwtPassportMiddleware, (req, res)=>{
	Vet.findByIDAndDelete(req.params.vetid)
        .then(() => {
            return response.status(HTTP_STATUS_CODES.NO_CONTENT).end();
        })
        .catch(error => {
            return response.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json(error);
        });
})

module.exports = { vetRouter };