const express = require('express');
const dotenv = require('dotenv').config;
const port = 3000;
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const cors = require('cors');
const path = require('path');

const options = {
        definition: {
            openapi: "3.0.0",
            info: {
                title: "Profile API",
                version: "1.0.0",
                description: "A simple Express Profile API",
            },
        },
        apis: [`${path.join(__dirname, "./routes/*.js")}`],
    };

const app = express();

app.use(cors({
    origin: 'http://localhost:3000'
}));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/', require('./routes/routes'));
app.use('/api-doc/profile', swaggerUI.serve, swaggerUI.setup( swaggerJsDoc(options)));

app.listen(port, () => console.log(`Server started on port ${port}`));
