const express = require('express');
const dotenv = require('dotenv').config;
//const  { DB_URI } = require("./config/index");
const {errorHandler} = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const port = process.env.PORT || 5000;

//connectDB();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended : false }));

app.use('/api/', require('./routes/routes'));

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));