const EventEmitter = require("events");

// const emitter = new EventEmitter();

//Registering the listerener for the evnt
// emitter.on("messageLogged", function(eventArg){
//   console.log("Listener is called!",eventArg);
// })

//Raise an event
// emitter.emit('messageLogged',{id:1,name:"Hrishabh"});
let Logger = require('./logger');
const logger = new Logger();
logger.log("Jeeva");






// const fs = require("fs");
// const files = fs.readdirSync('./');
// console.log(files);

// fs.readdir('$',function(err,files){
//   if (err) console.log("Error",err);
//   else console.log(files);
// })





// const os = require("os");

// var totalMemory = os.totalmem();
// var freeMemory = os.freemem();

// console.log(totalMemory);
// console.log(freeMemory);

// const path = require('path');

// var pathObj = path.parse(__filename);
// console.log(pathObj);


// const script =  require('./script.js');
// // import {largenumber} from './script.js';
// // console.log(largenumber);

// console.log(script.largenumber);
// console.log(__dirname);












