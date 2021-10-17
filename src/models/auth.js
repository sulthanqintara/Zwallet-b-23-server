const db = require("../database/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const register = (body) => {
  return new Promise((resolve, reject) => {
    const { email, username } = body;
    const getEmail = "SELECT email FROM users WHERE email = ?";
    db.query(getEmail, email, (err, resultGetEmail) => {
      if (err) return reject({ msg: "getEmail Error", err });
      if (resultGetEmail.length)
        return reject({ msg: "Email has register", err });
      const getUsername = "SELECT username FROM users WHERE username = ?";
      db.query(getUsername, username, (err, resultGetUsername) => {
        if (err) return reject({ msg: "getUsername Error", err });
        if (resultGetUsername.length)
          return reject({ msg: "Username has register", err });
        bcrypt.genSalt(10, (err, resultSalt) => {
          if (err) return reject({ msg: "Bcrypt error", err });
          bcrypt.hash(body.password, resultSalt, (error, resultHash) => {
            if (error) return reject({ msg: "Hash error", err });
            const userData = {
              ...body,
              password: resultHash,
            };
            const postQuery = "INSERT INTO users SET ?";
            db.query(postQuery, userData, (err) => {
              if (err)
                return reject({ msg: "postQuery error", err });
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
      if (err) return reject({ msg: "getQuery Error", err });
      if (!resultBody.length)
        return reject({ msg: "Email or Username not match", err });
      bcrypt.compare(password, resultBody[0].password, (err, resultCompare) => {
        if (err) return reject({ msg: "Compare Error", err });
        if (!resultCompare)
          return reject({ msg: "Password not match", err });
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
            if (err) return reject({ msg: "jwt error", err });
            const postToken = `INSERT INTO active_token (token) VALUES ("${token}")`;
            db.query(postToken, (err) => {
              if (err) return reject({ msg: "postToken error", err });
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
    db.query(queryDelete, (err) => {
      if (err) return reject({ msg: "queryDelete Error", err });
      return resolve("You have successfully logged out");
    });
  });
};

module.exports = { login, register, logout };
