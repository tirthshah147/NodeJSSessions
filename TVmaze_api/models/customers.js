const Joi = require("joi");
const mongoose = require("mongoose");

const customerSchema = mongoose.Schema({
  name:{
    type:String,
    required:true,
    minlength:5,
    maxlength:150
  },
  isGold:{
    type:Boolean,
    default:false
  },
  phone:{
    type:String,
    required:true,
    minlength:10,
    maxlength:12
  },
  isMarried:{
    type:Boolean,
    required:true
  }
})

const Customer = mongoose.model("Customers", customerSchema)


function validateCustomer(customer) {
  const schema = Joi.object({
    name:Joi.string().min(5).max(150).required(),
    phone:Joi.string().min(10).max(12).required(),
    isGold:Joi.boolean(),
    isMarried:Joi.boolean().required()
  })

  return schema.validate(customer);
}

module.exports.validate = validateCustomer;
module.exports.Customer = Customer;
module.exports.customerSchema = customerSchema;