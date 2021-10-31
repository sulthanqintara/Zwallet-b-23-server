const authRouter = require("express").Router();
const authHandler = require("../handlers/auth");

authRouter.post("/login", authHandler.login);
authRouter.post("/register", authHandler.register);
authRouter.delete("/logout", authHandler.logout);
authRouter.get("/checkToken", authHandler.checkToken);
authRouter.get("/checkRegister", authHandler.checkRegister);

module.exports = authRouter;
