const config = require("./config/config");
const cors = require("cors");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const http = require("http");
const server = http.createServer(app);
const { Server } = require("socket.io");
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

let messageData;

io.on("connection", (socket) => {
  console.log("a user connected");
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
