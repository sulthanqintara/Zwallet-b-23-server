const db = require("../database/db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const register = (body) => {
  return new Promise((resolve, reject) => {
    const { email } = body;
    const getQuery = "SELECT * FROM users WHERE email = ?";
    db.query(getQuery, email, (err, resultGetQuery) => {
      if (err) return reject({ msg: "SQL Error", status: 500, err });
      if (resultGetQuery.length)
        return reject({ msg: "Not match", status: 401, err });
      bcrypt.genSalt(10, (err, resultSalt) => {
        if (err) return reject({ msg: "Bcrypt error", status: 500, err });
        bcrypt.hash(body.password, resultSalt, (error, resultHash) => {
          if (error) return reject({ msg: "Hash error", status: 500, err });
          const userData = {
            ...body,
            password: resultHash,
          };
          const postQuery = "INSERT INTO users SET ?";
          db.query(postQuery, userData, (err) => {
            if (err) return reject({ msg: "SQL error", status: 500, err });
            return resolve("User Registered");
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
      if (err) return reject({ msg: "SQL Error", status: 500, err });
      if (!resultBody.length)
        return reject({ msg: "Not match", status: 401, err });
      bcrypt.compare(password, resultBody[0].password, (err, resultCompare) => {
        if (err) return reject({ msg: "SQL Error", status: 500, err });
        if (!resultCompare)
          return reject({ msg: "Not match", status: 401, err });
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
            if (err) return reject({ msg: "jwt error", status: 500, err });
            const postToken = `INSERT INTO active_token (token, time_issued) VALUES ("${token}",${Date.now()})`;
            db.query(postToken, (err) => {
              if (err)
                return reject({ msg: "SQL token error", status: 500, err });
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
      if (err) return reject({ msg: "SQL Error", status: 500, err });
      return resolve("You have successfully logged out");
    });
  });
};

module.exports = { login, register, logout };
