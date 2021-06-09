// _id : 60b91419d4e9273020197076

//12 byte
  //4 bytes : timestamp
  //3 bytes : machine identifier
  //2 bytes : process identifier
  //3 bytes : counter

  //1 byte = 8 bits
  //2 ^8 = 256
  //2^24 = 16M 

  //Driver -> ObjectID for mongoDB document

  const mongoose = require('mongoose');

  const id = new mongoose.Types.ObjectId();
  console.log(id);
  console.log(id.getTimestamp());
  const isValid = mongoose.Types.ObjectId.isValid('60b71419d4e9273020197076');
  console.log(isValid);



  










