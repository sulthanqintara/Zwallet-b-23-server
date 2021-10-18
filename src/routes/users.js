const userRouter = require("express").Router();
const userHandler = require("../handlers/users");
const authMiddleware = require("../middlewares/auth");
const uploadMiddleware = require("../middlewares/upload");

/* http://localhost:8000/users */
userRouter.get("/", userHandler.getUser);
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

module.exports = userRouter;