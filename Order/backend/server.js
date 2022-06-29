const express = require('express');
const dotenv = require('dotenv').config;
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const cors = require('cors')
const port = 3000;

const app = express();
app.use(cors({origin: "http://localhost:3000"}));

const http = require('http');
const server = http.createServer(app);

const io = require("socket.io")(server, {
  cors: {
    "origin": "*",
    "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  }
});

connectDB(); 

app.use(express.json());
app.use(express.urlencoded({ extended : false }));

app.use('/api/', require('./routes/routes'));

app.use(errorHandler);

const users = []
app.set("users", users);

io.on('connection', (socket) => {
    console.log('a user connected');
    console.log(socket.id);
    users.push(socket);
});

server.listen(port, () => {
  console.log(`listening on *:${port}`);
});

app.set("io", io);