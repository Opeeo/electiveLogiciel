const express = require('express');
const dotenv = require('dotenv').config;
const port = process.env.PORT || 3002;
const connectDB = require('./config/db')

//connectDB()
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended : false }));

app.use('/api/users', require('./routes/userRoutes'));

app.listen(port, () => console.log(`Server started on port ${port}`));

app.get("/", (req, res) => {
    res.send('Hello');
  });