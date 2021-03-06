const {Rental, validate} = require('../models/rentals');
const mongoose = require("mongoose");
const express = require("express");
const {Customer} = require("../models/customers");
const {Movie} = require("../models/movies");
const Fawn = require('fawn');
const router = express.Router();

Fawn.init(mongoose);

router.get('/', async(req,res) => {
  const rentals = await Rental.find().sort('-created_at');
  res.send(rentals);
})

router.post('/',async(req,res) => {
  const {error} = validate(req.body);
  if(error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findById(req.body.customerId);
  if (!customer) return res.status(400).send('Invalid Customers....');

  const movie = await Movie.findById(req.body.movieId);
  if (!movie) return res.status(400).send('Invalid Movie.');

  if (movie.numberInStock === 0) return res.staus(400).send("Movie not in stock.");

  let rental = new Rental({
    customer:{
      _id : customer._id,
      name:customer.name,
      phone:customer.phone,
      isGold:customer.isGold
    },
    movie:{
      _id : movie._id,
      title:movie.title,
      dailyRentalRate:movie.dailyRentalRate
    }
  })

  new Fawn.Task()
    .save('rentals',rental)
    .update('movies',{_id : movie._id}, {
      $inc:{
        numberInStock : -1
      }
    })
    .run();

  // rental = await rental.save();

  // movie.numberInStock--;
  // await movie.save();

  res.send(rental);

})

router.get('/:id',async(req,res) => {
  const rental = await Rental.findById(req.params.id);
  if(!rental) return res.status(404).send("The rental for given Id you need is not valid!");
  res.send(rental);
})


module.exports = router;

