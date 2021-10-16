const jwt = require("jsonwebtoken");
const responseHelper = require("../helpers/response");
const db = require("../database/mysql");

const checkToken = (req, res, next) => {
  const bearerToken = req.header("x-access-token");
  if (!bearerToken)
    return new Error(responseHelper.error(res, 401, "Anda belum login!"));
  const token = bearerToken.split(" ")[1];
  jwt.verify(token, process.env.SECRET_KEY, (err) => {
    if (err) {
      const queryDelete = `DELETE FROM active_token WHERE token = "${token}"`;
      db.query(queryDelete, (err) => {
        if (err) return new Error(responseHelper.error(res, 500, err));
        else
          return responseHelper.error(
            res,
            403,
            "Token Expired, Silahkan Login Kembali"
          );
      });
    } else {
      const query = `SELECT token FROM active_token WHERE token = "${token}"`;
      db.query(query, (err, result) => {
        if (err) return new Error(responseHelper.error(res, 500, err));
        if (!result.length)
          return new Error(
            responseHelper.error(res, 401, "Silahkan Login Kembali")
          );
        req.token = token;
        next();
      });
    }
  });
};

const authAdmin = (req, res, next) => {
  const token = req.token;
  jwt.verify(token, process.env.SECRET_KEY, (err, payload) => {
    if (err) return new Error(responseHelper.error(res, 401, err));
    req.payload = payload;
    if (payload.statusLevel !== 1)
      return new Error(responseHelper.error(res, 403, "Anda tidak diizinkan!"));
    next();
  });
};

const authSeller = (req, res, next) => {
  const token = req.token;
  jwt.verify(token, process.env.SECRET_KEY, (err, payload) => {
    if (err) return new Error(responseHelper.error(res, 401, err));
    req.payload = payload;
    if (payload.statusLevel !== 1)
      if (payload.statusLevel !== 2)
        return new Error(responseHelper.error(res, 403, "Anda tidak diizinkan!"));
    next();
  });
};

const authUser = (req, res, next) => {
  const token = req.token;
  jwt.verify(token, process.env.SECRET_KEY, (err, payload) => {
    if (err) return new Error(responseHelper.error(res, 401, err));
    req.payload = payload;
    if (payload.statusLevel !== 1)
      if (payload.statusLevel !== 3)
        return new Error(responseHelper.error(res, 403, "Anda tidak diizinkan!"));
    next();
  });
};
module.exports = { checkToken, authAdmin, authSeller, authUser };