const transactionRouter = require("express").Router();
const transactionHandler = require("../handlers/transactions");

transactionRouter.post("/", transactionHandler.addNewTransaction);
transactionRouter.get("/", transactionHandler.getTransaction);

module.exports = transactionRouter;
