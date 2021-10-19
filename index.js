require("dotenv").config();
const express = require("express");
const logger = require("morgan");
const mainRouter = require("./src/routes/index");
const cors = require("cors");
const app = express();
const { createServer } = require("http");
const { Server } = require("socket.io");
const httpServer = createServer(app);
const io = new Server(httpServer, {
  cors: {
    origin: ["https://localhost:3000"],
    methods: ["GET", "POST"],
    credentials: true,
  },
});
const port = process.env.SECRET_PORT;

// instalasi parser
app.use(express.urlencoded({ extended: false })); // memasang middleware parsing url-encoded
app.use(express.json()); // memasang middleware parsing raw json
app.use(logger("dev"));
app.use(cors());
app.use(express.static("public"));
app.use(mainRouter);
io.on("connection", (socket) => {
  console.log("Socket Connected on", socket.id);
});

// BASE URL => http://localhost:8000
httpServer.listen(port, () => {
  console.log(`Server started at port ${port}`);
});
const socketIoObject = io;
module.exports.ioObject = socketIoObject;
