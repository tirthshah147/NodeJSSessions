require('dotenv/config');
const AWS = require('aws-sdk');
const {v4 : uuidv4} = require('uuid');

const express = require('express');
const fs = require('fs');

const multer = require("multer");
const cors = require("cors");

// const upload = multer({dest : 'images/'});

// var storage = multer.diskStorage({
//   destination : function(req,file,cb){
//     cb(null, './upload');
//   },
//   filename : function(req,file,cb){
//     console.log(file.originalname);
//     cb(null,file.originalname );
//   }
// })


// For Amazon S3 create below storage

const storage = multer.memoryStorage({
  destination:function(req,file,cb){
    cb(null,'')
  }
});


//Configuring your backend for AWS S3

const s3 = new AWS.S3({
  credentials:{
    accessKeyId : process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey : process.env.AWS_SECRET_ACCESS_KEY
  }
})


const upload = multer({storage : storage});

const app = express();

app.use(cors());

// Route For Saving the files in Amazon S3

app.post('/images', upload.single('image'), (req,res) => {
  // console.log(req);
  // const imagePath = req.file.path;
  // console.log(req.file.buffer);
  const description = req.body.description;

  //Code for getting extension for the file
  let myFile = req.file.originalname.split('.');
  const fileType = myFile[myFile.length - 1];

  //Connecting Amazon S3
  const params = {
    Bucket : process.env.AWS_BUCKET_NAME,
    Key : `${uuidv4()}.${fileType}`,
    Body : req.file.buffer
  }

  s3.upload(params, (error,data) => {
    if (error) {
      res.status(500).send(error)
    }
    
    // res.status(200).send({...data, imagePath : `https://newton-bucket.s3.ap-south-1.amazonaws.com/${params.Key}`});

    res.status(200).send({...data, imagePath : `https://newton-bucket.s3.ap-south-1.amazonaws.com/1a7378a3-11c2-4b6c-b715-fe9284663101.png`});
  })





  // console.log(imagePath, description);
  // res.send({description, imagePath});

})

// app.get('/images/:imageName',(req,res) => {
//   const imageName = req.params.imageName;
//   //write logic for authorizing the user
  
//   //reading file
//   const readStream = fs.createReadStream(`images/${imageName}`);
//   readStream.pipe(res);

// })



// app.post('/images', upload.single('image'), (req,res) => {
//   console.log(req);
//   const imagePath = req.file.path;
//   const description = req.body.description;

//   //saving filename & description in database


//   console.log(imagePath, description);
//   res.send({description, imagePath});

// })

// app.post('/bulk', upload.array('image',4), (req,res) => {
//   try{
//     res.send(req.files);
//     console.log(req.files);
//   }catch(ex){
//     console.log(error);
//     res.send(400);
//   }
// })

app.listen(8080, () => console.log("Listening to port 8080...."));