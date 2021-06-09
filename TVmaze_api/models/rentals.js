const Joi = require("joi");
Joi.objectId = require('joi-objectid')(Joi);
const mongoose = require("mongoose");


const Rental = mongoose.model("Rentals", mongoose.Schema({
  customer:{
    type: mongoose.Schema({
      name:{
        type:String,
        required:true,
        minlength:5,
        maxlength:150
      },
      isGold:{
        type:Boolean,
        default:false,
      },
      phone:{
        type:String,
        required:true,
        minlength:10,
        maxlength:12
      }
    }),
    required:true
  },
  movie:{
    type:mongoose.Schema({
      title:{
        type:String,
        required:true,
        minlength:5,
        maxlength:255,
        trim:true
      },
      dailyRentalRate:{
        type:Number,
        required:true,
        min:0,
        max:399
      }
    }),
    required:true
  },
  dateReturned:{
    type:Date
  }

}, {timestamps : true}))

function validateRental(rental){
  const schema = Joi.object({
    customerId:Joi.objectId().required(),
    movieId:Joi.objectId().required(),
  })

  return schema.validate(rental)
}

module.exports.Rental = Rental;
module.exports.validate = validateRental;



