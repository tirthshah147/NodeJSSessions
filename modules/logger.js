const EventEmitter = require("events");
// const emitter = new EventEmitter();

class Logger extends EventEmitter{
  log(message){
    console.log(message);

    this.on("messageLogged", function(eventArg){
      console.log("Listener is called!",eventArg);
    })

    this.emit('messageLogged',{id:1,name:"Rohit"})
}

}

module.exports = Logger;

// const largenumber = 360;

// function add(){
//   return 5;
// }

// module.exports.largenumber = largenumber;