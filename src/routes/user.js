const userRouter = require("express").Router();
const userHandler = require("../handlers/user");
const authMiddleware = require("../middlewares/auth");
const uploadMiddleware = require("../middlewares/upload");

/* http://localhost:8000/users */
userRouter.get("/:id", authMiddleware.checkToken, userHandler.getUserById);
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
// userRouter.get('/classes/', userHandler.getClassByUser);

module.exports = userRouter;