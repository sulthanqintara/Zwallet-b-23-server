const responseHelper = require('../helpers/response');
const transactionModel = require('../models/transactions');

const addNewTransaction = (req, res) => {
    const { body } = req;
    transactionModel.addNewTransaction(body)
        .then((result) => responseHelper.success(res, 200, result))
        .catch((err) => responseHelper.error(res, 500, err));
}

module.exports = {
    addNewTransaction,
}