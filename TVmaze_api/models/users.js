const mongoose = require("mongoose");
const Joi = require("joi");
const { func } = require("joi");

const userSchema = mongoose.Schema({
  name:{
    type:String,
    required:true,
    minlength:5,
    maxlength:60
  },
  email:{
    type:String,
    required:true,
    minlength:5,
    maxlength:255,
    unique:true
  },
  password:{
    type:String,
    required:true,
    minlength:8,
    maxlength:1024
  }
})

const User = mongoose.model(' User',userSchema);

function validateUser(user) {
  const schema = Joi.object({
    name:Joi.string().min(5).max(50).required(),
    email:Joi.string().min(5).max(256).required().email(),
    password:Joi.string().min(8).max(1024).required()
  })

  return schema.validate(user);
}

module.exports.User = User;
module.exports.validate = validateUser;
