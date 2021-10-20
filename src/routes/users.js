const userRouter = require("express").Router();
const userHandler = require("../handlers/users");
const authMiddleware = require("../middlewares/auth");
const uploadMiddleware = require("../middlewares/upload");

/* http://localhost:8000/users */
userRouter.get("/", userHandler.getUser);
userRouter.post(
  "/verify-pin",
  authMiddleware.checkToken,
  userHandler.verifyPin
);
userRouter.get("/:id", authMiddleware.checkToken, userHandler.getUserById);
userRouter.patch(
  "/update-pin/:id",
  authMiddleware.checkToken,
  userHandler.updatePIN
);
userRouter.patch(
  "/update-password/:id",
  authMiddleware.checkToken,
  userHandler.updatePassword
);
userRouter.patch(
  "/edit-user/:id",
  authMiddleware.checkToken,
  uploadMiddleware.upload.single("image"),
  userHandler.editUser
);
userRouter.post("/forgot_password", userHandler.forgotPassword);
userRouter.post("/forgot_password/check-code", userHandler.checkForgotPassword);
userRouter.patch(
  "/forgot_password/change-password",
  userHandler.changePassword
);

module.exports = userRouter;
