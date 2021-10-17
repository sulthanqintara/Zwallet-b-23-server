const userModel = require("../models/users");
const responseHelper = require("../helpers/response");

const getUserById = (req, res) => {
  const { params } = req;
  userModel
    .getUserById(params.id)
    .then((result) =>
      responseHelper.success(res, "Get data success", 200, result)
    )
    .catch((err) => responseHelper.error(res, "Error SQL", 500, err));
};

const editUser = (req, res) => {
  const { file, params, body } = req;
  userModel
    .editUser(file, params.id, body)
    .then((result) =>
      responseHelper.success(res, "Update user success", 200, result)
    )
    .catch((err) => responseHelper.error(res, "Error SQL", 500, err));
};

const updatePassword = (req, res) => {
  const { body, params } = req;
  userModel
    .updatePassword(body, params.id)
    .then((result) =>
      responseHelper.success(res, "Update password success", 200, result)
    )
    .catch((err) => {
      if (err === 401)
        responseHelper.error(res, "Old Password Wrong", 401, err);
      else responseHelper.error(res, "Error SQL", 500, err);
    });
};

const getUser = (req, res) => {
  const { query } = req;
  userModel
    .getUser(query)
    .then(
      ({ result, totalData, totalPage, currentPage, prevPage, nextPage }) => {
        const info = {
          data: result,
          totalData,
          totalData,
          totalPage,
          currentPage,
          prevPage,
          nextPage,
        };
        responseHelper.success(res, "Get data success", 200, info);
      }
    )
    .catch((err) => {
      if (err === 404) responseHelper.error(res, "Data Not Found!", 404, err);
      else responseHelper.error(res, "Error SQL", 500, err);
    });
};

module.exports = {
  getUserById,
  updatePassword,
  editUser,
  getUser,
};
