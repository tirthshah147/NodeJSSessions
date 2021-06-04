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

function validateCourse(course){
  const schema = Joi.object({
    name : Joi.string().min(3).required()
  })

  return schema.validate(course);
}


module.exports.Course = Course;
module.exports.validateCourse = validateCourse;