require("dotenv").config();
const express = require("express");
const logger = require("morgan");
const mainRouter = require("./src/routes/index");
const cors = require("cors");
const app = express();
const port = process.env.SECRET_PORT;

// instalasi parser
app.use(express.urlencoded({ extended: false })); // memasang middleware parsing url-encoded
app.use(express.json()); // memasang middleware parsing raw json
app.use(logger("dev"));


app.use(cors());
// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader("Access-Control-Allow-Method", "GET,POST,PATCH,DELETE");
//   res.setHeader("Access-Control-Allow-Header", "Content-Type, Authorization, x-access-token");
//   next();
// });
app.use(express.static("public"));
app.use(mainRouter);

// BASE URL => http://localhost:8000
app.listen(port, () => console.log(`App started running at ${port}`));

