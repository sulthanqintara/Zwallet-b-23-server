const transactionRouter = require('express').Router();
const transactionHandler = require('../handlers/transactions');

transactionRouter.post('/', transactionHandler.addNewTransaction);

module.exports = transactionRouter;