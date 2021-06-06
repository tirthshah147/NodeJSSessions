const {Course} = require('../models/course');

async function getCourse(req,res) {
  const courses = await Course.find();
  res.send(courses);
}


module.exports.getCourse = getCourse;