const { get } = require('https');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/coursesDB',{useNewUrlParser:true, useUnifiedTopology:true})
.then(() => console.log("Database is connected..."))
.catch(err => console.log("Database failed to connect ",err));


const courseSchema = mongoose.Schema({
  name: {
    type:String, 
    required:true,
    minlength:5,
    maxlength:255,
    // match:/pattern/
  },
  author:String,
  tags:{
    type:Array,
    validate:{
      validator:function(v){   // v->["Nodejs", "Web development", "Backend"]
        return v && v.length > 0;
      },
      message:"A course should have atleast one tag!"
    }
  },
  category:{
    type:String,
    enum:['web','desktop','android'],
    lowercase:true,
    // uppercase:true,
    trim:true
  },
  isPublished:{type:Boolean, default:false},
  price:{
    type:Number,
    required:function(){return this.isPublished},
    get: v => Math.round(v),
    set: v => Math.round(v)

  }
}, {timestamps : true})

const Course = mongoose.model('Course',courseSchema);

async function createCourse(){
    const course = new Course({
      name:"ExpressJS Lectures",
      author:"Manjeema",
      category:"Web",
      tags:['websites'],
      isPublished:true,
      price:13.8
    });

    try{
      const result = await course.save();
      console.log(result);
    }catch(error){
      for (field in error.errors){
        console.log("Error",error.errors[field].message);
      }
    }
}


async function getCourseById(id){
  const result = await Course.findById(id);
  console.log(result.price);
}

getCourseById('60b908e289289535c467c16e');

//Conditional Query operators

//eq (equal)
//ne (not equal)
//gt (greater than)
//gte (greater than equal)
//lt (less than)
//lte (less than & equal)
//in 
//nin (not in)

//logical operators

//or
//and

async function getCourse(){
  const pageNumber = 2;
  const pageSize = 6;
  const id = "60b7ad43eee9c342acaa91b9";

  const courses = await Course
  // .find({isPublished : true})
  // .find({price:{$gt:200, $lt:300 }})
  // .find({price : {$in: [200,250,300,500]} })
  // .find()
  // .find({author: /.*ee.*/})
  // .findById('60b7ad43eee9c342acaa91b9')
  // .find({_id : id})
  // .or([ {author:"Jeeva"}, {isPublished:false}])
  // .and([{},{}])
  .skip((pageNumber - 1) * pageSize)
  .find()
  .limit(10)
  .sort({name:1})
  // .count();
  // .select({name:1,tags:1,author:1})
  console.log(courses);
}

async function updateCourse(id){
  //Approach : Query first
  //findByid
  //Modify its parameters
  //save()

  //Approch 1 begins

  // const course = await Course.findById(id);
  // if (!course) return;
  // course.isPublished = false;
  // course.author = "Tirth";

  // course.set({
  //   isPublished:false,
  //   author:"Rekha"
  // });

  // const result = await course.save();
  // console.log(result);



  //Approach: Update first
  //Update directly
  //Optionally, you can get updated document

  //Approach 2 begins

  // const result = await Course.update({_id : id},{
  //   $set:{
  //     author:"Rishav",
  //     isPublished:true
  //   }
  // })

  const result = await Course.updateMany({author:"Mayank"},{
    // $set:{
    //   author:"Mayank",
    //   isPublished:true
    // }
    // $push:{
    //   tags:"Backend"
    // }
    // $addToSet:{
    //   tags:"Backend"
    // }
    // $pull:{
    //   tags:"developer"
    // }

    $set : {
      author:"Tirth",
      price: 1000
    }
  }, { new:true })

  console.log(result);

}

// updateCourse();
// updateCourse('60b7ad714103504f6c159048');

async function removeCourse(id){
  // const result = await Course.deleteMany({isPublished: true});
  // const result = await Course.deleteOne({isPublished: true});
  console.log(result);
}

// removeCourse('60b7bcb2a2843749c0d54ad9');


