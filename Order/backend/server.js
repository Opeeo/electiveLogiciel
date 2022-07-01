const express = require('express');
const dotenv = require('dotenv').config;
const { errorHandler } = require("./middleware/errorMiddleware");
const connectDB = require("./config/db");
const port = 3000;
const cors = require('cors');

const app = express();

app.use(cors({origin: "http://localhost:3000"}));

const http = require('http');
const server = http.createServer(app);

const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET","PUT","POST","DELETE"],
  }
});

connectDB(); 

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/', require('./routes/routes'));

app.use(errorHandler);

const users = []
app.set("users", users);

io.sockets.on("connection", function (socket) {
  console.log("a user connected" + socket.id);

  socket.on("disconnect", function () {
    console.log("user disconnected");
  }
  );
});

server.listen(port, () => {
  console.log(`listening on *:${port}`);
});

app.set("io", io);