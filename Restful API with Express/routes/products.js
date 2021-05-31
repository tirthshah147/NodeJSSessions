const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send("GET request for products is successfull.");
})

router.post('/', (req, res) => {
  res.send("POST request for products is successfull.");
})

router.put('/:id', (req, res) => {
  res.send("PUT request for products is successfull.");
})

router.delete('/:id', (req, res) => {
  res.send("DELETE request for products is successfull.");
})

module.exports = router;