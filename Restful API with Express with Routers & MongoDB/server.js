// // require('dotenv/config');
// console.log(process.env);

//TEMPLATES & TEMPLATE ENGINE
const courseRouter = require('./routes/course');
const startupDebugger = require('debug')('app:startup');
const dbDebugger = require('debug')('app:db');
const mongoose = require('mongoose');
const express = require('express');
const { func } = require("joi");
var cors = require('cors');
const helmet = require("helmet");
var morgan = require('morgan');
const app = express();

app.use(cors());
app.use(helmet());

mongoose.connect('mongodb://localhost/coursesDB',{useNewUrlParser:true, useUnifiedTopology:true})
.then(() => console.log("Database is connected..."))
.catch(err => console.log("Database failed to connect ",err));

app.use(express.json());
app.use(express.urlencoded({extended : true}));

app.use('/api/courses',courseRouter);


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening to port ${port}....`));





