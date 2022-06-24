const express = require('express');
const dotenv = require('dotenv').config;
const port = process.env.PORT || 3002;
const connectDB = require('./config/db')

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended : false }));

app.use('/api/', require('./routes/routes'));

app.listen(port, () => console.log(`Server started on port ${port}`));
