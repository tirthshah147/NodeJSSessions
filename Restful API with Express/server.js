// require('dotenv/config');
console.log(process.env);

const Joi = require("joi");
const express = require('express');
const { func } = require("joi");
var cors = require('cors');
const helmet = require("helmet");
var morgan = require('morgan');
const app = express();


console.log(`NODE_ENV : ${process.env.NODE_ENV}`);
console.log(app.get('env'));


app.use(cors());
app.use(helmet());
// req -> json format -> js object -> //req.body
app.use(express.json());
app.use(express.urlencoded({extended : true}));
app.use(express.static('public'));


// express.json() -> function (req,res,next) {
//   //parsing the json data coming in request
//   // req.body = JS object
//   next();
// }

if (app.get('env') === "development") {
  app.use(morgan('tiny'));
  console.log("Morgan Enabled.....");
}



app.use(function(req,res,next){
  console.log("Logging....");
  next();
})

function middleware(req,res,next) {
  console.log("I am trying to delete something...");
  next();
}

app.use(function(req,res,next){
  console.log("Authorizing......");
  next();
})


const courses = [
  {id:1, name:"Python"},
  {id:2, name:"Node JS"},
  {id:3, name:"React"},
]


app.get('/api/courses',(req,res) => {
  res.send(courses);
})

app.get('/api/courses/:id',(req,res) => {
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("The course with the given ID doen't exist");
  res.send(course);

});


// {name:"Express JS"}

app.post('/api/courses',(req,res) => { 
  // console.log(req.body);
  //Input Validation using Joi
  const result = validateCourse(req.body);
  console.log(result);

  if(result.error){
    return res.status(400).send(result.error.details[0].message);
  }

  //Input Validation Desi
  // if(!req.body.name || req.body.name.length < 3){
  //   return res.status(400).send("Name is required and should be of length greater than 3");
  // }


  const course = {
    id : courses.length + 1,
    name : req.body.name
  }
  courses.push(course);
  res.send(course);
})

app.put('/api/courses/:id',(req,res) => {
  //Look up for the course
  //if not existing, return 404
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("The course with the given ID doen't exist");

  //Validate
  //if invalid, return status 400 - Bad request
  const result = validateCourse(req.body);
  
  console.log(result);

  if(result.error){
    return res.status(400).send(result.error.details[0].message);
  }

  //Update course
  course.name = req.body.name;

  //Return the updated course
  res.send(course);

})


app.delete('/api/courses/:id',middleware,(req,res) => {
  //Look up for the course
  //NOt existing, return 404
  const course = courses.find(c => c.id === parseInt(req.params.id));
  if (!course) return res.status(404).send("The course with the given ID doen't exist");

  //Delete
  const index = courses.indexOf(course);
  courses.splice(index,1);

  //Return the same course
  res.send(course);
})

function validateCourse(course){
  const schema = Joi.object({
    name : Joi.string().min(3).required()
  })

  return schema.validate(course);
}


// app.get('/',(req,res) => {
//   res.send("Hello world!");
// });

// app.get('/api/courses',(req,res) => {
//   res.send({id: 1,name: "Leanne Graham"});
// });

// app.get('/api/blogs/:year/:month',(req,res) => {
//   // res.send(req.params);
//   console.log(req.params.year);
//   res.send(req.query);
// });




const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`Listening to port ${port}....`));


// app.post();
// app.put();
// app.delete();



