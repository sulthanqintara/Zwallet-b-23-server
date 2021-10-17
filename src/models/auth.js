const db = require("../database/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const register = (body) => {
  return new Promise((resolve, reject) => {
    const { email, username } = body;
    const getEmail = "SELECT email FROM users WHERE email = ?";
    db.query(getEmail, email, (err, resultGetEmail) => {
      if (err) return reject(err);
      if (resultGetEmail.length) return reject("emailHandler");
      const getUsername = "SELECT username FROM users WHERE username = ?";
      db.query(getUsername, username, (err, resultGetUsername) => {
        if (err) return reject(err);
        if (resultGetUsername.length) return reject("usernameHandler");
        bcrypt.genSalt(10, (err, resultSalt) => {
          if (err) return reject(err);
          bcrypt.hash(body.password, resultSalt, (err, resultHash) => {
            if (err) return reject(err);
            const userData = {
              ...body,
              password: resultHash,
            };
            const postQuery = "INSERT INTO users SET ?";
            db.query(postQuery, userData, (err) => {
              if (err) return reject(err);
              return resolve("User Registered");
            });
          });
        });
      });
    });
  });
};

const login = (body) => {
  return new Promise((resolve, reject) => {
    const { userLogin, password } = body;
    const getQuery = `SELECT * FROM users WHERE email = ? OR username = ?`;
    db.query(getQuery, [userLogin, userLogin], (err, resultBody) => {
      // console.log(resultBody);
      if (err) return reject(err);
      if (!resultBody.length) return reject(401);
      bcrypt.compare(password, resultBody[0].password, (err, resultCompare) => {
        if (err) return reject(err);
        if (!resultCompare) return reject(401);
        const userInfo = {
          userId: resultBody[0].id,
          authLevel: Number(resultBody[0].role_id),
          username: resultBody[0].username,
          firstName: resultBody[0].first_name,
          lastName: resultBody[0].last_name,
          userPhone: resultBody[0].phone,
        };
        const payload = {
          firstName: resultBody[0].first_name,
          lastName: resultBody[0].last_name,
          userId: resultBody[0].id,
          authLevel: Number(resultBody[0].role_id),
        };
        jwt.sign(
          payload,
          process.env.SECRET_KEY,
          {
            expiresIn: "7d",
            issuer: "zwallet",
          },
          (err, token) => {
            if (err) return reject(err);
            const postToken = `INSERT INTO active_token (token) VALUES ("${token}")`;
            db.query(postToken, (err) => {
              if (err) return reject(err);
              return resolve({ token, userInfo: userInfo });
            });
          }
        );
      });
    });
  });
};

const logout = (req) => {
  return new Promise((resolve, reject) => {
    const { body } = req;
    const queryDelete = `DELETE FROM active_token WHERE token = "${body.token}"`;
    db.query(queryDelete, (err, result) => {
      if (err) return reject(err);
      return resolve(result);
    });
  });
};

module.exports = { login, register, logout };
