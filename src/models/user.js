const bcrypt = require("bcrypt");
const db = require("../database/db");

const updatePassword = (body, id) => {
  return new Promise((resolve, reject) => {
    const { oldPass, newPass } = body;
    const getPassQuery = "SELECT password FROM users WHERE id = ?";
    db.query(getPassQuery, id, (err, res) => {
      if (err) return reject({ msg: "getPassQuery Error", err });
      bcrypt.compare(oldPass, res[0].password, (err, result) => {
        //   console.log('oldPass', result)
        if (err) return reject({ msg: "Compare Error", err });
        if (!result) return reject({ msg: "Password not match", err });
        bcrypt.hash(newPass, 10, (err, hash) => {
          // console.log('newPass', hash)
          if (err) return reject({ msg: "Hash Error", err });
          const newPassword = {
            password: hash,
          };
          // console.log(newPassword)
          const updateQuery = "UPDATE users SET ? WHERE id = ?";
          db.query(updateQuery, [newPassword, id], (err, result) => {
            // console.log(newPassword)
            if (err) return reject({ msg: "updateQuery Error", err });
            return resolve("Password has changed");
          });
        });
      });
    });
  });
};

const editUser = (file, id, body) => {
  return new Promise((resolve, reject) => {
    const getFileQuery = "SELECT picture FROM users WHERE id = ?";
    db.query(getFileQuery, id, (err, dbUrl) => {
      if (err) return reject({ msg: "getFileQuery Error", err });
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
        if (err) return reject({ msg: "updateQuery Error", err });
        const getUserQuery = "SELECT * FROM users WHERE id = ?";
        db.query(getUserQuery, id, (err, userData) => {
          if (err) return reject({ msg: "getUserQuery Error", err });
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

const getUserById = (id) => {
  return new Promise((resolve, reject) => {
    const queryGet = `SELECT id AS userId, username AS userUsername, picture AS userImage, email AS userEmail, first_name AS userFirstName, last_name AS userLastName, phone AS userPhone, pin_number AS userPIN, role_id AS userAuthLevel FROM users WHERE id = ? `;
    db.query(queryGet, id, (error, result) => {
      if (error) return reject({ msg: "queryGet Erro", error });
      return resolve(result);
    });
  });
};

module.exports = {
  updatePassword,
  editUser,
  getUserById,
};
