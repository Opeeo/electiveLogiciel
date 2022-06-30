const express = require('express');
const dotenv = require('dotenv').config;
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const cors = require('cors');
const socketioJwt = require('socketio-jwt');
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
app.use(express.urlencoded({ extended: false }));

app.use('/api/', require('./routes/routes'));

app.use(errorHandler);

const users = []
app.set("users", users);

io.sockets.on(
    "connection",
    socketioJwt.authorize({
      secret: process.env.JWT_SECRET,
      timeout: 15000, // 15 seconds to send the authentication message
    })
  )
  .on("authenticated", function (socket) {
    //this socket is authenticated, we are good to handle more events from it.
    socket.on("message", (msg) => {
      console.log(msg);
    });
    socket.on("disconnect", () => {
      socket.emit("tryCom", "You have been disconnected");
      console.log("User " + socket.id + " have been disconnected");
    });

    console.log(`Hello! ${socket.decoded_token.id} ` + socket.id);
    users[socket.decoded_token.id] = socket;
  });

server.listen(port, () => {
  console.log(`listening on *:${port}`);
});

app.set("io", io);