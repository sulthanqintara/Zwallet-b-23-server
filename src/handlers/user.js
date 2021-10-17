const userModel = require("../models/user");
const responseHelper = require("../helpers/response");

const editUser = (req, res) => {
  const { file, params, body} = req;
  userModel
    .editUser(file, params.id, body)
    .then((result) => responseHelper.success(res, 200, result))
    .catch((err) => responseHelper.error(res, 500, err));
};

const updatePassword = (req, res) => {
  const { body, params } = req;
  userModel
    .updatePassword(body, params.id)
    .then((result) => responseHelper.success(res, 200, result))
    .catch((err) => {
      if ((err = "Password not match")) responseHelper.error(res, 401, err);
      else responseHelper.error(res, 500, err);
    });
};

const getUserById = (req, res) => {
  const { params } = req;
  userModel
    .getUserById(params.id)
    .then((result) => responseHelper.success(res, 200, result))
    .catch((err) => {
      if (err === 404) responseHelper.error(res, 404, "User Not Found!");
      else responseHelper.error(res, 500, err);
    });
};



module.exports = {
  updatePassword,
  editUser,
  getUserById,
};