const {Genre, validate} = require('../models/genres');
const auth = require('../middlewares/auth');
const admin = require('../middlewares/admin');
// const asyncMiddleware = require('../middlewares/async');
const mongoose = require("mongoose");
const express = require("express");
const { nextTick } = require('process');
const router = express.Router();



//Frontend code

// response = fetch('url')
// resp = response.json

// if(resp.status === 200){
//   //perform the work
//   this.setState({genres : resp.genres})
// }else{
//   alert(resp.message);
// }

router.get('/', async(req,res,next) => {
  throw new Error("Error occured!");
  const genres = await Genre.find().sort('name');
  res.send(genres);
});

// router.get('/', asyncMiddleware(async(req,res,next) => {
//   throw new Error("Error occured!");
//   const genres = await Genre.find().sort('name');
//   res.send(genres);
// }));

// router.get('/', async(req,res,next) => {

//   try{
//     throw new Error("Error occured!");
//     const genres = await Genre.find().sort('name');
//     res.send(genres);
//   }catch(ex){
//     next(ex);
//   }
    
//     // let data = {
//     //   genres,
//     //   status:200,
//     //   message:"All Genres are selected"
//     // }
//     // res.status(200).send(data);
    
//   // }
  
//   // catch(error){
//   //   let data = {
//   //     status:404,
//   //     message:"Error while getting genres!"
//   //   }
//   //   res.status(404).send(data);
//   // }
  
// })


router.post('/',[auth,admin],async(req,res) => {
  console.log(req.user);
  const {error} = validate(req.body);
  if(error) return res.status(400).send(error.details[0].message);


  let genre = new Genre({name:req.body.name});
  genre = await genre.save();
  res.send(genre);
  console.log(genre);
})


router.put('/:id',auth,async(req,res) => {
  const {error} = validate(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  const genre = await Genre.findByIdAndUpdate(req.params.id,{
    $set:{
      name:req.body.name
    }
  },{new:true})

  if(!genre) return res.status(404).send("The Id you need to update is not valid!");

  res.send(genre);
})


router.delete('/:id',auth,async(req,res) => {
  const genre = await Genre.findByIdAndDelete(req.params.id);
  if(!genre) return res.status(404).send("The Id you need to delete is not valid!");
  res.send(genre);
})

router.get('/:id',async(req,res) => {
  const genre = await Genre.findById(req.params.id);
  if(!genre) return res.status(404).send("The data for Id you need is not valid!");
  res.send(genre);
})

module.exports = router;

