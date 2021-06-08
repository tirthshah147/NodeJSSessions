const mongoose = require("mongoose");
const Joi = require("joi");
const {genereSchema} = require('../models/genres');


const Movie = mongoose.model("Movies",mongoose.Schema({
  title : {
    type:String,
    required:true,
    minlength:5,
    maxlength:255,
    trim:true
  },
  genre:{
    type:genereSchema,
    required:true
  },
  numberInStock:{
    type:Number,
    required:true,
    min:0,
    max:300
  },
  dailyRentalRate:{
    type:Number,
    required:true,
    min:0,
    max:399
  }
}));

function validateMovie(movie) {
  const schema = Joi.object({
    title:Joi.string().min(5).max(255).required(),
    genreId:Joi.string().required(),
    numberInStock:Joi.number().min(0).max(300).required(),
    dailyRentalRate:Joi.number().min(0).required()
  })

  return schema.validate(movie);
}


module.exports.Movie = Movie;
module.exports.validate = validateMovie;