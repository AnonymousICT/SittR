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
petRouter.get('/', (req, res)=> {
    Pet.find({user: request.user.id})
        .populate('user')
        .then(pet => {
            return res.status(HTTP_STATUS_CODES.OK).json(pet.serialize());
        })
        .catch(error => {
            return res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json(error);
        })

})

module.exports = { petRouter };