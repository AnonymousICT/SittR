const mongoose = require('mongoose');
const Joi = require('joi');


const petSchema = new mongoose.Schema({
	user: {type: mongoose.Schema.Types.ObjectId, ref:'user'},
	petName: { type: String, required: true }, //Max, Rex, etc.
	petType: { type: String, required: true }, //for this MVP cats or dogs
	petBreed: {type: String}, //mixed, corgis, etc
	petAge: {type: Number, required: true},
	petSize: {type: String, required:true}, //xs, s, m, l, xl
	petWeight: {type: Number}, //type  in that number
	petActivityLevel: {type: Number}, //1 = turtle 10 = rocket ship 
	petIntact: {type: String, required: true }, //Intact Male, Intact Female, Neutered and Spayed
	petDietRestrictions: {type: String}, //My dog is allergic to carrots or my cat eats only wet food
	petBehavior: {
		dogs: {type: String},
		cats: {type: String}.
		children: {type: String},
		miscPets: {type: String}, //birds, pocket pets, fish etc.
		other: {type: String} //my dog eats poop, my cat runs out the front door etc.
	},
	petMedical: {
		Insurance: {type: String},
		Vaccines: {type: String}, //this needs to be updated
		Medication: {
			fleas: {type: Boolean, required: true},
			ticks: {type: Boolean, required: true},
			heartworm: {type: Boolean, required: true},
			other: {type:String}
		},
		VetInfo: {
			Name: {type: String, required:true},
			Address: {type:String, required:true},
			Phone: {type:String, required:true}
		}
	}
})

petSchema.methods.serialize = function () {
	let user;

	if (typeof this.user.serialize === 'function') {
		user = this.user.serialize();
	} else {
		user = this.user;
	}
	return {
		id: this._id,
		user: user,
		petName: this.petName,
		petType: this.petType,
		petBreed: this.petBreed,
		petAge: this.petAge,
		petSize: this.petSize,
		petWeight: this.petWeight,
		petActivityLevel: this.petActivityLevel,
		petIntact: this.petIntact,
		petDietRestrictions: this.petDietRestrictions,

	};
};

const PetJoiSchema = Joi.object().keys({
	user: Joi.string().optional(),
	petName: Joi.string().min(1).required(),
	petType: Joi.string().min(1).required(),
	petBreed: Joi.string().min(1).required(),
	petAge: Joi.number().min(1).required(),
	petSize: Joi.string().min(1).required(),
	petWeight: Joi.number().optional(),
	petActivityLevel: Joi.number().optional(),
	petIntact: Joi.string().min(1).required(),
	petDietRestrictions: Joi.string().optional()

})

const Pet = mongoose.model('Pet', petSchema);

module.exports = { Pet, PetJoiSchema }