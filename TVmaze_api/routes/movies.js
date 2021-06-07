const {Movie, validate} = require('../models/movies');
const {Genre} = require('../models/genres');
const mongoose = require("mongoose");
const express = require("express");
const router = express.Router();

router.get('/',async(req,res) => {
  const movies = Movie.find().sort("name");
  res.send(movies);
})

router.post('/',async(req,res)=> {
  const {error} = validate(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  const genre = Genre.findById(req.body.genreId);
  if(!genre) return res.status(400).send("Invalid genreId");

  let movie = new Movie({
    title:req.body.title,
    genre:{
      _id:genre._id,
      name:genre.name
    },
    numberInStock:req.body.numberInStock,
    dailyRentalRate:req.body.dailyRentalRate
  })

  movie = await movie.save();
  res.send(movie);

})


router.put('/:id',async(req,res) => {
  const {error} = validate(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  const genre = Genre.findById(req.body.genreId);
  if(!genre) return res.status(400).send("Invalid genreId");

  const movie = await Movie.findByIdAndUpdate(req.params.id,{
    $set:{
      title:req.body.title,
      genre:{
        _id:genre._id,
        name:genre.name
      },
      numberInStock:req.body.numberInStock,
      dailyRentalRate:req.body.dailyRentalRate
    }
  },{new:true})

  if(!movie) return res.status(404).send("The Id you need to update is not valid!");

  res.send(movie);
})


router.delete('/:id',async(req,res) => {
  const movie = await Movie.findByIdAndDelete(req.params.id);
  if(!movie) return res.status(404).send("The Id you need to delete is not valid!");
  res.send(movie);
})


module.exports = router;