const bcrypt = require("bcrypt");
const db = require("../database/db");
const nodemailer = require("nodemailer");

const getUserById = (id) => {
  return new Promise((resolve, reject) => {
    const queryGet = `SELECT id AS userId, username AS userUsername, picture AS userImage, email AS userEmail, first_name AS userFirstName, last_name AS userLastName, phone AS userPhone, pin_number AS userPIN, role_id AS userAuthLevel, balance AS userBalance, picture AS userImage FROM users WHERE id = ? `;
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

const forgotPassword = (body) => {
  return new Promise((resolve, reject) => {
    const { email } = body;
    const getEmailQuery = "SELECT email FROM users WHERE email = ?";
    db.query(getEmailQuery, email, (err, result) => {
      console.log(result);
      if (err) return reject(err);
      if (!result.length) return reject(404);
      const min = Math.ceil(111111);
      const max = Math.floor(999999);
      const code = Math.floor(Math.random() * (max - min) + min);
      const postCodeQuery =
        "INSERT INTO forgot_password (email, code) VALUES (? , ?)";
      db.query(postCodeQuery, [result[0].email, code], (err) => {
        if (err) return reject(err);
        const transporter = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: process.env.EMAIL_SENDER,
            pass: process.env.PASSWORD_SENDER,
          },
        });
        const mailOptions = {
          from: process.env.EMAIL_SENDER,
          to: email,
          subject: "Code Reset Password",
          text: `this code for reset your password ${code}`,
        };
        // send email
        transporter.sendMail(mailOptions, (err) => {
          if (err) return reject("node mailer error");
          return resolve("code sent to database and email");
        });
      });
    });
  });
};

const checkForgotCode = (body) => {
  return new Promise((resolve, reject) => {
    const { code, email } = body;
    const getEmailQuery = "SELECT email FROM users WHERE email = ?";
    db.query(getEmailQuery, email, (err, result) => {
      if (err) return reject(err);
      const email = result[0].email;
      const checkCodeQuery =
        "SELECT code FROM forgot_password WHERE email = ? AND code = ?";
      db.query(checkCodeQuery, [email, code], (err, res) => {
        if (err) return reject(err);
        if (!res.length) return reject(404);
        return resolve("Code is valid");
      });
    });
  });
};

const changePassword = (body) => {
  return new Promise((resolve, reject) => {
    const { code, email, password } = body;
    const getEmailQuery = "SELECT email FROM users WHERE email = ?";
    db.query(getEmailQuery, email, (err, result) => {
      if (err) return reject(err);
      const email = result[0].email;
      const checkCodeQuery =
        "SELECT code FROM forgot_password WHERE email = ? AND code = ?";
      db.query(checkCodeQuery, [email, code], (err, res) => {
        if (err) return reject(err);
        if (!res.length) return reject(404);
        const updatePassQuery = "UPDATE users SET ? WHERE email = ?";
        bcrypt.hash(password, 10, (err, hash) => {
          if (err) return reject(err);
          const newPassword = {
            password: hash,
          };
          db.query(updatePassQuery, [newPassword, email], (err, result) => {
            if (err) return reject(err);
            return resolve("Password sudah diganti");
          });
        });
      });
    });
  });
};

const getUser = (query) => {
  return new Promise((resolve, reject) => {
    const id = query?.id ? query.id : 0;
    const keyword = query?.keyword ? query.keyword : "";
    const orderBy = query.order_by ? query.order_by : "username";
    const sort = query.sort ? query.sort : "ASC";
    const page = Number(query.page) || 1;
    const limit = Number(query.limit) || 5;
    const offset = limit * (page - 1);
    const queryString = `SELECT id AS userId, username AS userUsername, picture AS userImage, email AS userEmail, first_name AS userFirstName, last_name AS userLastName, phone AS userPhone, pin_number AS userPIN, role_id AS userAuthLevel FROM users WHERE NOT id = ${id} AND (username LIKE "%${keyword}%" OR phone LIKE "%${keyword}%") ORDER BY ${orderBy} ${sort}, phone ${sort} LIMIT ${limit} OFFSET ${offset}`;
    db.query(queryString, (err, result) => {
      if (err) return reject(err);
      if (!result.length) return reject(404);
      const queryCountTotal = `SELECT COUNT(id) AS totalUser, username AS userUsername, picture AS userImage, email AS userEmail, first_name AS userFirstName, last_name AS userLastName, phone AS userPhone, pin_number AS userPIN, role_id AS userAuthLevel FROM users WHERE NOT id = ${id} AND (username LIKE "%${keyword}%" OR phone LIKE "%${keyword}%") ORDER BY ${orderBy} ${sort}, phone ${sort}`;
      db.query(queryCountTotal, (err, totalResult) => {
        if (err) return reject(err);
        const totalData = totalResult[0].totalUser;
        const totalPage = Math.ceil(totalData / limit);
        const baseURL = `/users?limit=${limit}&`;
        let urlPrevPage = baseURL;
        let urlNextPage = baseURL;
        query.keyword &&
          ((urlPrevPage = urlPrevPage + `keyword=${keyword}&`),
          (urlNextPage = urlNextPage + `keyword=${keyword}&`));
        query.order_by &&
          ((urlPrevPage = urlPrevPage + `order_by=${orderBy}&`),
          (urlNextPage = urlNextPage + `order_by=${orderBy}&`));
        query.sort &&
          ((urlPrevPage = urlPrevPage + `sort=${sort}&`),
          (urlNextPage = urlNextPage + `sort=${sort}&`));
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

const verifyPin = (body) => {
  return new Promise((resolve, reject) => {
    const userId = body?.user_id ? Number(body.user_id) : null;
    const pin = body?.pin ? body.pin : "0";
    console.log(userId, pin);
    const queryGetPin = `SELECT pin_number FROM users WHERE id = ?`;
    db.query(queryGetPin, userId, (err, res) => {
      if (err) return reject(err);
      bcrypt.compare(pin, res[0].pin_number, (err, compareResult) => {
        if (err) return reject(err);
        if (!compareResult) return reject(404);
        console.log("result", compareResult);
        return resolve("success");
      });
    });
  });
};

module.exports = {
  getUserById,
  editUser,
  updatePIN,
  updatePassword,
  forgotPassword,
  checkForgotCode,
  changePassword,
  getUser,
  verifyPin,
};
