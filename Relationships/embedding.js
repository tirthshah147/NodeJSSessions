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
    type:[authorSchema],
    required:true
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
  .select('name author');
  
  console.log(courses);
}

async function updateAuthor(courseId){
  const course = await Course.update({_id : courseId},{
    $unset:{
      "author" : ""
    }
  });

}

// createAuthor("Tirth","I am Jingalaa", "jingalala.com");
// createCourse("Node JS", '60ba54f6c7a17626b836fea2');

// createCourse("Node JS", [
//   new Author({name:"Rishav"}),
//   new Author({name:"Manjeema"}),
// ]);

async function addAuthor(courseId, author){
  // const course = await Course.findById(courseId);
  // course.author.push(author);
  // course.save();
  const course = await Course.findByIdAndUpdate(courseId,{
    $push:{
      author:author
    }
  });
}

async function removeAuthor(courseId, authorId){
  const course = await Course.findById(courseId);
  const author = course.author.id(authorId);
  author.remove();
  course.save();
}

// addAuthor('60ba5c66674f534700b66b40',new Author({name:"Sreedhar"}));

removeAuthor('60ba5c66674f534700b66b40',"60ba5c66674f534700b66b3e");

// listCourse();

// updateAuthor('60ba5abc8714dc46fc4f02a0');



