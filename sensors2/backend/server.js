const express = require('express');
const dotenv = require('dotenv').config;
const port = process.env.PORT || 3000;
const connectDB = require('./config/db')
const {errorHandler} = require('./middleware/errorMiddleware')

connectDB()

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended : false }));

app.use('/api/sensors2', require('./routes/sensorRoutes'))

app.use(errorHandler)

app.listen(port, () => console.log(`Server started on port ${port}`));