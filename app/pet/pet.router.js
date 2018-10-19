const express = require('express');
const Joi = require('joi');

const { HTTP_STATUS_CODES } = require('../config.js');
const { pet, UserJoiSchema } = require('./pet.model.js');

const petRouter = express.Router();

//creating the user's pet
petRouter.post('/', (req, res)=>{
    const newPet{
        petName: req.body.petName,
        petType: req.body.petType
    };
    const validation = Joi.valdate(newPet, petJoiSchema);
    if (validation.error) {
        return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({error: validation});
    }

    Pet.create(newPet)
        .then(createdPet => {
            return res.status.(HTTP_STATUS_CODES.CREATED).json(createdPet.serialize());
        })
        .catch(error => {
            return res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json(error);
        }); 
});

//retreive the user's pet
petRouter.get('/', jwtPassportMiddleware, (req, res)=> {
    Pet.find({user: req.user.id})
        .populate('user')
        .then(pet => {
            return res.status(HTTP_STATUS_CODES.OK).json(pet.serialize());
        })
        .catch(error => {
            return res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json(error);
        });
});

//retreiving all of the user's pets
petRouter.get('/pets', (req,res)=>{
    pet.find()
        .populate('user')
        .then(pets => {
            return res.status(HTTP_STATUS_CODES.OK).json(pet.serialize()
            );
        });
})

//retrieve specific pet by id
petRouter.get('/:petid', jwtPassportMiddleware, (req, res) => {
    Pet.findByID(req.params.petid)
        .populate('user')
        .then(pet => {
            return res.status(HTTP_STATUS_CODES.OK).json(pet.serialize());
        })
        .catch(error => {
            return res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json(error);
        });
});

//update pet by id
petRouter.put('/:petid', jwtPassportMiddleware, (req, res)=> {
    const petUpdate = {
        petName: req.body.petName,
        petType: req.body.petType
    }
    const validation = Joi.validation(petUpdate, petJoiSchema);
    if (validation.error) {
        return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({error:validation.error});
    }
    Pet.findByIDAndUpdate(req.params.petid, petUpdate)
        .then(()=>{
            return res.status(HTTP_STATUS_CODES.NO_CONTENT).end();
        })
        .catch(error => {
            return res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json(error);
        });
});

//delete pet by id
petRouter.delete('/:petid', jwtPassportMiddleware, (req, res)=>{
    Pet.findByIDAndDelete(req.params.petid)
        .then(() => {
            return response.status(HTTP_STATUS_CODES.NO_CONTENT).end();
        })
        .catch(error => {
            return response.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json(error);
        });
})


module.exports = { petRouter };