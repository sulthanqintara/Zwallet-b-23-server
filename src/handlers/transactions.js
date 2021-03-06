const responseHelper = require("../helpers/response");
const transactionModel = require("../models/transactions");

const addNewTransaction = (req, res) => {
  const { body } = req;
  transactionModel
    .addNewTransaction(body)
    .then((result) => responseHelper.success(res, "Success", 200, result))
    .catch((err) => responseHelper.error(res, "Error", 500, err));
};
const getTransaction = (req, res) => {
  const { query } = req;
  transactionModel
    .getAllTransactionsByUser(query)
    .then((result) => responseHelper.success(res, "Success", 200, result))
    .catch((err) => {
      if (err == 404)
        return responseHelper.error(res, "Data not found", 404, err);
      return responseHelper.error(res, "Error", 500, err);
    });
};

module.exports = {
  addNewTransaction,
  getTransaction,
};
