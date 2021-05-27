// require('dotenv/config');
// console.log(process.env);


const express = require('express');
const app = express();

app.use(express.json());

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
  console.log(req.body);
  const course = {
    id : courses.length + 1,
    name : JSON.parse(req.body).name
  }
  courses.push(course);
  res.send(course);
})



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

