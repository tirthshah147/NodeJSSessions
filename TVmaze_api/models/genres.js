const mongoose = require("mongoose");
const Joi = require("joi");


const genereSchema = mongoose.Schema({
  name:{
    type:String,
    required:true,
    minlength:5,
    maxlength:60
  }
})

const Genre = mongoose.model('Genre',genereSchema);

function validateGenre(genre) {
  const schema = Joi.object({
    name : Joi.string().min(5).required()
  })

  return schema.validate(genre);
}

module.exports.genereSchema = genereSchema;
module.exports.Genre = Genre;
module.exports.validate = validateGenre;



