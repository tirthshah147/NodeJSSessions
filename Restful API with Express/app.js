const express = require('express');
const app = express();

const customers = require('./routes/customers');
const products = require('./routes/products');

app.use('/api/customers',customers);
app.use('/api/products',products);

const port = process.env.PORT || 5000;


app.listen(port, () => console.log(`Server is started on ${port}`));
