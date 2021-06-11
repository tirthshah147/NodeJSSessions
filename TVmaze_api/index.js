require('express-async-errors');
const winston = require('winston');
const mongoose = require("mongoose");
const express = require("express");
const errorMiddleware = require('./middlewares/error');
const genres = require("./routes/genres");
const movies = require("./routes/movies");
const customers = require("./routes/customers");
const rentals = require("./routes/rentals");
const users = require("./routes/users");
const auth = require("./routes/auth");

//creating app
const app =express()

// winston.add(winston.transports.File, {filename:"errorLogFile.log"});
module.exports = winston.createLogger({

  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
  ],
});

//connecting database using mongoose -> tvmaze
mongoose.connect('mongodb://localhost/tvmaze',{useNewUrlParser:true, useUnifiedTopology:true
})
.then(() => console.log("DB connected..."))
.catch((e) => console.log("error while connecting"));


//middleware for json
app.use(express.json());

//routes

app.use('/api/genres',genres);
app.use('/api/customers',customers);
app.use('/api/movies',movies);
app.use('/api/rentals',rentals);
app.use('/api/users',users);
app.use('/api/auth',auth);


app.use(errorMiddleware);

//connecting port 3000

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server is started on ${port}`));


// Winston contains transporting methods

// console           mongodb
// File              couchdb
// Http              redis
                  
