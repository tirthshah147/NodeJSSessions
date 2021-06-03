const express = require('express');
const router = express.Router();
const {getCustomers, postCustomers} = require('../getCustomers');

router.use((req,res,next) => {
  console.log("Authorizing customer....");
  next();
})

router.get('/customer-name/:key', (req, res) => {
  res.send(`GET request for customer ${req.params.key} is successfull.`);
})

router.get('/', getCustomers);

// router.get('/:customer-name([a-zA-Z])', (req, res) => {
//   res.send(`GET request for customer ${req.params.customer-name} is successfull.`);
// })

router.post('/', (req, res) => {
  res.send("POST request for customers is successfull.");
})

router.put('/:id([0-9]{3})', (req, res) => {
  res.send(`PUT request for customer ${req.params.id} is successfull.`);
})

router.delete('/:id', (req, res) => {
  res.send("DELETE request for customers is successfull.");
})

router.get('*',(req,res) => {
  const resObj = {
    statusCode:404,
    statusMsg:"URL not found"
  }
  res.send(resObj);
})

module.exports = router;