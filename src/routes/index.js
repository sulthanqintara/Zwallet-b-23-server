// ROUTER FILE UTAMA
const mainRouter = require("express").Router();

// SUB-ROUTER
const pingRouter = require("./ping");
const authRouter = require("./auth");
const userRouter = require("./users");

mainRouter.use("/", pingRouter);
mainRouter.use("/auth", authRouter);
mainRouter.use("/users", userRouter);

module.exports = mainRouter;
