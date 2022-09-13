const config = require("./config/config");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});
const { sequelize } = require("./models");

app.use(morgan("combined"));
app.use(bodyParser.json());
app.use(cors());

io.use(async (socket, next) => {
  // fetch token from handshake auth sent by FE
  const token = socket.handshake.auth.token;
  try {
    // verify jwt token and get user data
    const user = await jwt.verify(token, config.authentication.jwtSecret);
    console.log("user", user);
    // save the user data into socket object, to be used further
    socket.user = user;
    next();
  } catch (e) {
    // if token is invalid, close connection
    console.log("error", e.message);
    return next(new Error(e.message));
  }
});

io.on("connection", (socket) => {
  console.log("a user connected");
  // let token = socket.handshake.auth.token;
  let messageData;

  socket.on("message", (data) => {
    messageData = {
      time: data.time,
      message: data.message,
    };
    io.emit("return-message", {
      data: messageData,
      from: data.send_id,
      to: data.receive_id,
    });
  });
});

require("./routers")(app);

sequelize.sync({ force: false }).then(() => {
  server.listen(config.port);
  console.log(`Server start on port ${config.port}`);
});
