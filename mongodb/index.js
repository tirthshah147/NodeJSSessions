const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/coursesDB',{useNewUrlParser:true, useUnifiedTopology:true})
.then(() => console.log("Database is connected..."))
.catch(err => console.log("Database failed to connect ",err));

const courseSchema = mongoose.Schema({
  name: String,
  author:String,
  tags:[String],
  isPublished:Boolean
}, {timestamps : true})

const Course = mongoose.model('Course',courseSchema);

async function createCourse(){


    const course = new Course({
      name:"ExpressJS",
      author:"Gowtham",
      tags:["Expressjs", "Web development", "Backend"],
      isPublished:true
    });

    const result = await course.save();
    console.log(result);

  
  
}

createCourse();




