const express = require('express');
const Joi = require('joi');
const petRouter = express.Router();

const { HTTP_STATUS_CODES } = require('../config.js');
const { jwtPassportMiddleware } = require('../auth/auth.strategy');
const { Pet, PetJoiSchema } = require('./pet.model.js');


//creating the user's pet
petRouter.post('/', jwtPassportMiddleware, (req, res) => {
    const newPet = {
        user: req.user.id,
        petName: req.body.petName,
        petType: req.body.petType,
        petBreed: req.body.petBreed,
        petAge: req.body.petAge,
        petSize: req.body.petSize,
        petWeight: req.body.petWeight,
        petActivityLevel: req.body.petActivityLevel,
        petIntact: req.body.petIntact,
        petDietRestrictions: req.body.petDietRestrictions,
        petBehavior: req.body.petBehavior
    };
    const validation = Joi.validate(newPet, PetJoiSchema);
    if (validation.error) {
        return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({error: validation.error});
    }

    Pet.create(newPet)
        .then(createdPet => {
            return res.status(HTTP_STATUS_CODES.CREATED).json(createdPet.serialize());
        })
        .catch(error => {
            return res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json(error);
        }); 
});

//retreive the user's pet
petRouter.get('/', jwtPassportMiddleware, (req, res) => {
    Pet.find({user: req.user.id})
        .populate('user')
        .then(pets => {
            return res.status(HTTP_STATUS_CODES.OK).json(
                pets.map(pet => pet.serialize())
            );
        })
        .catch(error => {
            return res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json(error);
        });
});

//retreiving all of the user's pets
petRouter.get('/pets', (req, res)=>{
    pet.find()
        .populate('user')
        .then(pets => {
            return res.status(HTTP_STATUS_CODES.OK).json(pets.map(pet => pet.serialize())
            );
        })
        .catch(error => {
            return res.status(HTTP_STATUS_CODES.INTERNAL_SERVER_ERROR).json(error);
        });
});

//retrieve specific pet by id
petRouter.get('/:petid', (req, res) => {
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
        petType: req.body.petType,
        petBreed: req.body.petBreed,
        petAge: req.body.petAge,
        petSize: req.body.petSize,
        petWeight: req.body.petWeight,
        petActivityLevel: req.body.petActivityLevel,
        petIntact: req.body.petIntact,
        petDietRestrictions: req.body.petDietRestrictions,
        petBehavior: req.body.petBehavior
    }
    const validation = Joi.validation(petUpdate, PetJoiSchema);
    if (validation.error) {
        return res.status(HTTP_STATUS_CODES.BAD_REQUEST).json({ error:validation.error });
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