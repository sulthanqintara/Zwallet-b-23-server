const { query } = require("express");
const db = require("../database/db");

const addNewTransaction = (body) => {
  return new Promise((resolve, reject) => {
    const amount = body?.amount ? Number(body.amount) : 0;
    const senderId = body?.sender_id && Number(body.sender_id);
    const recepientId = body?.recipient_id && Number(body.recipient_id);
    const queryString = `INSERT INTO transactions SET ?`;
    db.query(queryString, body, (err, result) => {
      if (err) return reject(err);
      const queryGetBalance = `SELECT balance, id FROM users WHERE id = ? OR id = ?`;
      db.query(
        queryGetBalance,
        [senderId, recepientId],
        (err, balanceResult) => {
          if (err) return reject(err);
          let balanceSender = 0;
          let balanceRecipient = 0;
          if (balanceResult[0].id === senderId) {
            balanceSender = balanceResult[0].balance
              ? balanceResult[0].balance
              : 0;
            balanceRecipient = balanceResult[1].balance
              ? balanceResult[1].balance
              : 0;
          } else {
            balanceSender = balanceResult[1].balance
              ? balanceResult[1].balance
              : 0;
            balanceRecipient = balanceResult[0].balance
              ? balanceResult[0].balance
              : 0;
          }
          balanceSender = balanceSender - amount;
          balanceRecipient = balanceRecipient + amount;
          console.log("sender:", balanceSender, "recipient:", balanceRecipient);
          const queryBalance = `UPDATE users SET balance = ? WHERE id = ?`;
          db.query(
            queryBalance,
            [balanceRecipient, recepientId],
            (err, addBalanceResult) => {
              if (err) return reject(err);
              db.query(queryBalance, [balanceSender, senderId], (err, res) => {
                return resolve("Transaction Created");
              });
            }
          );
        }
      );
    });
  });
};

const getAllTransactionsByUser = (query) => {
  return new Promise((resolve, reject) => {
    let user_id = query?.user_id && query.user_id;
    let order_by = query?.order_by ? query.order_by : "timestamp";
    const duration = query?.duration ? query.duration : "0000-00-00";
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 4;
    const offset = limit * (page - 1);
    let sort = query?.sort ? query?.sort : "DESC";
    const queryString = `SELECT t.id, t.sender_id, u.username AS sender, t.recipient_id, u2.username AS recepient, t.amount, t.timestamp, t.status, t.transaction_status_id, u.picture AS sender_picture, u2.picture AS recepient_picture FROM transactions t JOIN users u ON t.sender_id = u.id join users u2 ON t.recipient_id = u2.id WHERE t.timestamp >= ? AND (t.sender_id = ? OR t.recipient_id = ?) ORDER BY ? ? LIMIT ? OFFSET ?`;
    db.query(
      queryString,
      [duration, user_id, user_id, order_by, sort, limit, offset],
      (err, result) => {
        if (err) return reject(err);
        if (result.length < 1) return reject(404);
        const queryCount =
          'SELECT COUNT(id) AS "total_transaction" FROM transactions WHERE timestamp >= ? AND (sender_id = ? OR recipient_id = ?)';
        db.query(
          queryCount,
          [duration, user_id, user_id],
          (err, totalCount) => {
            if (err) return reject(err);
            const totalData = totalCount[0].total_transaction;
            const totalPage = Math.ceil(totalData / limit);
            const baseURL = `/transaction?limit=${limit}&`;
            let urlPrevPage = baseURL;
            let urlNextPage = baseURL;
            query.user_id &&
              ((urlPrevPage = urlPrevPage + `user_id=${user_id}&`),
              (urlNextPage = urlNextPage + `user_id=${user_id}&`));
            query.order_by &&
              ((urlPrevPage = urlPrevPage + `order_by=${order_by}&`),
              (urlNextPage = urlNextPage + `order_by=${order_by}&`));
            query.sort &&
              ((urlPrevPage = urlPrevPage + `sort=${sort}&`),
              (urlNextPage = urlNextPage + `sort=${sort}&`));
            const prevPage = page > 1 ? urlPrevPage + `page=${page - 1}` : null;
            const nextPage =
              page < totalPage ? urlNextPage + `page=${page + 1}` : null;
            return resolve({
              transactionData: result,
              totalData,
              totalPage,
              currentPage: page,
              prevPage,
              nextPage,
            });
          }
        );
      }
    );
  });
};

module.exports = {
  addNewTransaction,
  getAllTransactionsByUser,
};
