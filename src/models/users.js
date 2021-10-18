const bcrypt = require("bcrypt");
const db = require("../database/db");

const getUserById = (id) => {
  return new Promise((resolve, reject) => {
    const queryGet = `SELECT id AS userId, username AS userUsername, picture AS userImage, email AS userEmail, first_name AS userFirstName, last_name AS userLastName, phone AS userPhone, pin_number AS userPIN, role_id AS userAuthLevel FROM users WHERE id = ? `;
    db.query(queryGet, id, (err, result) => {
      if (err) return reject(err);
      return resolve(result);
    });
  });
};

const editUser = (file, id, body) => {
  return new Promise((resolve, reject) => {
    const getFileQuery = "SELECT picture FROM users WHERE id = ?";
    db.query(getFileQuery, id, (err, dbUrl) => {
      if (err) return reject(err);
      let input;
      if (file) {
        const imageUrl = `/images/${file.filename}`;
        input = {
          picture: imageUrl,
        };
      }
      if (!file) {
        input = {
          picture: dbUrl[0]?.picture,
        };
      }
      const newBody = { ...body, ...input };
      const updateQuery = "UPDATE users SET ? WHERE id = ?";
      db.query(updateQuery, [newBody, id], (err) => {
        if (err) return reject(err);
        const getUserQuery = "SELECT * FROM users WHERE id = ?";
        db.query(getUserQuery, id, (err, userData) => {
          if (err) return reject(err);
          const userInfo = [
            {
              userId: userData[0].id,
              userUsername: userData[0].username,
              userImage: userData[0].picture,
              userEmail: userData[0].email,
              userFirstName: userData[0].first_name,
              userLastName: userData[0].last_name,
              userPhone: userData[0].phone,
              userPIN: userData[0].pin_number,
              userAuthLevel: userData[0].role_id,
            },
          ];
          return resolve(userInfo);
        });
      });
    });
  });
};

const updatePIN = (body, id) => {
  return new Promise((resolve, reject) => {
    const { oldPinNumber, newPinNumber } = body;
    const getPassQuery = "SELECT pin_number FROM users WHERE id = ?";
    db.query(getPassQuery, id, (err, res) => {
      if (err) return reject(err);
      bcrypt.compare(oldPinNumber, res[0].pin_number, (err, result) => {
        if (err) return reject(err);
        if (!result) return reject(404);
        bcrypt.hash(newPinNumber, 10, (err, hash) => {
          if (err) return reject(err);
          const data = {
            pin_number: hash,
          };
          const updateQuery = "UPDATE users SET ? WHERE id = ?";
          db.query(updateQuery, [data, id], (err, result) => {
            if (err) return reject(err);
            return resolve(result);
          });
        });
      });
    });
  });
};

const updatePassword = (body, id) => {
  return new Promise((resolve, reject) => {
    const { oldPass, newPass } = body;
    const getPassQuery = "SELECT password FROM users WHERE id = ?";
    db.query(getPassQuery, id, (err, res) => {
      if (err) return reject(err);
      bcrypt.compare(oldPass, res[0].password, (err, result) => {
        if (err) return reject(err);
        if (!result) return reject(404);
        bcrypt.hash(newPass, 10, (err, hash) => {
          if (err) return reject(err);
          const newPassword = {
            password: hash,
          };
          const updateQuery = "UPDATE users SET ? WHERE id = ?";
          db.query(updateQuery, [newPassword, id], (err, result) => {
            if (err) return reject(err);
            return resolve(result);
          });
        });
      });
    });
  });
};

const getUser = (query) => {
  return new Promise((resolve, reject) => {
    const keyword = query?.keyword ? query.keyword : "";
    const sort = query.sort ? query.sort : "ASC";
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 5;
    const offset = limit * (page - 1);
    const queryString = `SELECT id AS userId, username AS userUsername, picture AS userImage, email AS userEmail, first_name AS userFirstName, last_name AS userLastName, phone AS userPhone, pin_number AS userPIN, role_id AS userAuthLevel FROM users WHERE username LIKE "%${keyword}%" OR phone LIKE "%${keyword}%" ORDER BY username ${sort}, phone ${sort} LIMIT ${limit} OFFSET ${offset}`;
    db.query(queryString, (err, result) => {
      if (err) return reject(err);
      if (!result.length) return reject(404);
      const queryCountTotal = `SELECT id AS userId, username AS userUsername, picture AS userImage, email AS userEmail, first_name AS userFirstName, last_name AS userLastName, phone AS userPhone, pin_number AS userPIN, role_id AS userAuthLevel FROM users WHERE username LIKE "%${keyword}%" OR phone LIKE "%${keyword}%" ORDER BY username ${sort}, phone ${sort}`;
      db.query(queryCountTotal, (err, totalResult) => {
        if (err) return reject(err);
        const totalData = totalResult[0].total;
        const totalPage = Math.ceil(totalData / limit);
        const baseURL = `/users?limit=${limit}&`;
        let urlPrevPage = baseURL;
        let urlNextPage = baseURL;
        query.keyword &&
          ((urlPrevPage = urlPrevPage + `keyword=${keyword}&`),
          (urlNextPage = urlNextPage + `keyword=${keyword}&`));
        const prevPage = page > 1 ? urlPrevPage + `page=${page - 1}` : null;
        const nextPage =
          page < totalPage ? urlNextPage + `page=${page + 1}` : null;
        return resolve({
          result,
          totalData,
          totalPage,
          currentPage: page,
          prevPage,
          nextPage,
        });
      });
    });
  });
};

module.exports = {
  getUserById,
  editUser,
  updatePIN,
  updatePassword,
  getUser,
};
