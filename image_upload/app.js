const express = require('express');
const fs = require('fs');

const multer = require("multer");
const cors = require("cors");

const upload = multer({dest : 'images/'});

const app = express();

app.use(cors());

app.get('/images/:imageName',(req,res) => {
  const imageName = req.params.imageName;
  //write logic for authorizing the user

  //reading file
  const readStream = fs.createReadStream(`images/${imageName}`);
  readStream.pipe(res);

})



app.post('/images', upload.single('image'), (req,res) => {
  console.log(req);
  const imagePath = req.file.path;
  const description = req.body.description;

  //saving filename & description in database


  console.log(imagePath, description);
  res.send({description, imagePath});

})

app.listen(8080, () => console.log("Listening to port 8080...."));