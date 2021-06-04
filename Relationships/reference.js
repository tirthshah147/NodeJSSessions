const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/playground',{useNewUrlParser:true, useUnifiedTopology:true})
.then(() => console.log("Database is connected..."))
.catch((err) => console.log("Error while connecting",err));

const authorSchema = mongoose.Schema({
  name:String,
  bio:String,
  website:String
})

const Author = mongoose.model("Author",authorSchema);

const courseSchema = mongoose.Schema({
  name:String,
  author:{
    type:mongoose.Schema.Types.ObjectId,
    ref:"Author"
  }
})

const Course = mongoose.model("Course",courseSchema);

async function createAuthor(name,bio,website){
  const author = new Author({
    name,
    bio,
    website
  })

  const result = await author.save();
  console.log(result);
}

async function createCourse(name,author){
  const course = new Course({
    name,
    author
  })

  const result = await course.save();
  console.log(result);
}


async function listCourse(){
  const courses = await Course
  .find()
  .populate('author',"name -_id bio")
  .select('name author');
  
  console.log(courses);
}

// createAuthor("Tirth","I am Jingalaa", "jingalala.com");
// createCourse("Node JS", '60ba54f6c7a17626b836fea2');

listCourse();



