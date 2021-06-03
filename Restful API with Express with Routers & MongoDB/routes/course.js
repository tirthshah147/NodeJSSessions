const express = require('express');
const Joi = require("joi");
const router = express.Router();
const mongoose = require('mongoose');

const courseSchema = mongoose.Schema({
  name:{
    type:String,
    required:true,
    minlength:5,
    maxlength:255
  }
})

const Course = mongoose.model('courses',courseSchema);


router.get('/',async(req,res) => {
  const courses = await Course.find();
  res.send(courses);
})

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


function validateCourse(course){
  const schema = Joi.object({
    name : Joi.string().min(3).required()
  })

  return schema.validate(course);
}




module.exports = router;