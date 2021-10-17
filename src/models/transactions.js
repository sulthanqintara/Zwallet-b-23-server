const db = require('../database/db');

const addNewTransaction = (body) => {
    return new Promise((resolve, reject) => {
        const queryString = `INSERT INTO transactions SET ?`;
        db.query(queryString, body, (err, result) => {
            if (err) return reject(err);
            return resolve(result);
        })
    })
}

const getAllTransactionsByUser = (id) => {
    return new Promise((resolve, reject) => {
        const queryString = `SELECT * FROM transactions WHERE user_id = ?`;
        db.query(queryString, id, (err, result) => {
            if (err) return reject(err);
            return resolve(result);
        })
    })
}

module.exports = {
    addNewTransaction,
    getAllTransactionsByUser,
}