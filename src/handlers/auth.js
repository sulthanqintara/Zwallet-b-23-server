const { query } = require("express");
const responseHelper = require("../helpers/response");
const authModel = require("../models/auth");

const register = (req, res) => {
  const { body } = req;
  authModel
    .register(body)
    .then((result) => responseHelper.success(res, 201, result))
    .catch((err) => {
      if (err === 409) responseHelper.error(res, 409, "E-mail already registered");
      else responseHelper.error(res, 500, err);
    });
};

const login = (req, res, next) => {
  const { body } = req;
  authModel
    .login(body)
    .then((result) => responseHelper.success(res, 200, result))
    .catch((error) => {
      if (error === 401)
        responseHelper.error(res, 401, "Invalid Email or Password");
      else responseHelper.error(res, 500, error);
    });
};

const logout = (req, res) => {
  authModel
    .logout(req)
    .then((result) => responseHelper.success(res, 200, result))
    .catch((err) => responseHelper.error(res, 500, err));
};


module.exports = {
  login,
  register,
  logout,
};