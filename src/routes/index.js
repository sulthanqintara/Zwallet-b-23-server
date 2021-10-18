// ROUTER FILE UTAMA
const mainRouter = require("express").Router();

// SUB-ROUTER
const pingRouter = require("./ping");
const authRouter = require("./auth");
const userRouter = require("./users");
const transactionRouter = require("./transactions");

mainRouter.use("/", pingRouter);
mainRouter.use("/auth", authRouter);
mainRouter.use("/users", userRouter);
mainRouter.use("/transaction", transactionRouter);

module.exports = mainRouter;
