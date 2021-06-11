const jwt = require('jsonwebtoken');
const _ = require("lodash");
const auth = require('../middlewares/auth');
const bcrypt = require('bcrypt');
const {User, validate} = require('../models/users');
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();
require('dotenv/config');


router.get('/me',auth,async(req,res) => {
  const user = await User.findById(req.user._id).select('-password');
  res.send(user);
})


router.get('/', async(req,res) => {
    const genres = await User.find().sort('name');
    res.send(genres);
})


router.post('/',async(req,res) => {
  const {error} = validate(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  let user = await User.findOne({email:req.body.email});
  if(user) return res.status(400).send("User is already registered.")
  

  user = new User(_.pick(req.body,['name','email','password']));
  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password,salt);
  user = await user.save();

  // res.send({
  //   name : user.name,
  //   email: user.email
  // });

  const token = user.generateAuthToken();
  console.log(token);


  res.header('x-auth-token',token).send(_.pick(user,['name','email']));
  console.log(user);
})


router.put('/:id',async(req,res) => {
  const {error} = validate(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  const isValid = mongoose.Types.ObjectId.isValid(req.params.id);
  if(!isValid) return res.status(400).send("Id is not valid...");

  const user = await User.findByIdAndUpdate(req.params.id,{
    $set:{
      name:req.body.name,
      email:req.body.email,
      password:req.body.password
    }
  },{new:true})

  if(!user) return res.status(404).send("The Id you need to update is not valid!");

  res.send(user);
})


router.delete('/:id',async(req,res) => {
  const user = await User.findByIdAndDelete(req.params.id);
  if(!user) return res.status(404).send("The Id you need to delete is not valid!");
  res.send(user);
})

router.get('/:id',async(req,res) => {
  const user = await User.findById(req.params.id);
  if(!user) return res.status(404).send("The data for Id you need is not valid!");
  res.send(user);
})


module.exports = router;

// study o clock


