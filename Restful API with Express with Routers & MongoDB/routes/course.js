const express = require('express');
const Joi = require("joi");
const {Course, validateCourse} = require('../models/course');
const router = express.Router();
const {getCourse} = require('../controller/course');

router.get('/',getCourse);

router.get('/:id',async(req,res) => {
  const course = Course.findById(req.params.id);
  if (!course) return res.status(404).send("The course with the given ID doen't exist");
  res.send(course);

});

router.post('/',async(req,res) => { 
  const result = validateCourse(req.body);
  console.log(result);

  if(result.error){
    return res.status(400).send(result.error.details[0].message);
  }

  let newCourse = new Course({
    name : req.body.name
  })
  
  const course = await newCourse.save();
  res.send(course);
})


router.put('/:id',async(req,res) => {

  const result = validateCourse(req.body);
  if(result.error){
    return res.status(400).send(result.error.details[0].message);
  }

  const course = await Course.findByIdAndUpdate(req.params.id,{
    $set:{
      name:req.body.name
    }
  },{new:true})

  if (!course) return res.status(404).send("The course with the given ID doen't exist");

  res.send(course);

})

router.delete('/:id',async(req,res) => {

  const course = await Course.findByIdAndDelete(req.params.id);
  if (!course) return res.status(404).send("The course with the given ID doen't exist");

  res.send(course);
})


module.exports = router;