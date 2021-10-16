// ROUTER FILE UTAMA
const mainRouter = require("express").Router()

// SUB-ROUTER
const pingRouter = require("./ping")
const authRouter = require("./auth")

mainRouter.use("/", pingRouter)
mainRouter.use("/auth", authRouter)

module.exports = mainRouter