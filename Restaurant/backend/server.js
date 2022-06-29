const express = require('express');
const dotenv = require('dotenv').config;
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const port = 3000;
const cors = require('cors');

connectDB();

const app = express();

app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/', require('./routes/routes'));

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));