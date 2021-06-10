const jwt = require('jsonwebtoken');
const _ = require("lodash");
const bcrypt = require('bcrypt');
const {User} = require('../models/users');
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
const Joi = require('joi');
require('dotenv/config');




router.post('/',async(req,res) => {
  const {error} = validate(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({email:req.body.email});
  if(!user) return res.status(400).send("Invalid email or password.");

  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if(!validPassword) return res.status(400).send('Invalid email or password.');

  const token = user.generateAuthToken();
  res.send(token);
})




function validate(user) {
  const schema = Joi.object({
    email:Joi.string().min(5).max(256).required().email(),
    password:Joi.string().min(8).max(1024).required()
  })

  return schema.validate(user);
}







module.exports = router;

// study o clock


