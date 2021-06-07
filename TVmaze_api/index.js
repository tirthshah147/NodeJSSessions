const mongoose = require("mongoose");
const express = require("express");
const genres = require("./routes/genres");
const movies = require("./routes/movies");


//creating app
const app =express()

//connecting database using mongoose -> tvmaze
mongoose.connect('mongodb://localhost/tvmaze',{useNewUrlParser=true, useUnifiedTopology:true
})
.then(() => console.log("DB connected..."))
.catch((e) => console.log("error while connecting"));


//middleware for json
app.use(express.json());

//routes

app.use('/api/genres',genres);
app.use('/api/customers',customers);
app.use('/api/movies',movies);
// app.use('/api/rentals',rentals);

//connecting port 3000

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server is started on ${port}`));
