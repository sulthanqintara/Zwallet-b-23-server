// ROUTER FILE UTAMA
const mainRouter = require("express").Router()

// SUB-ROUTER
const pingRouter = require("./ping")

mainRouter.use("/", pingRouter)


module.exports = mainRouter