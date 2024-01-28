const app = require("express").Router()
const authRouter = require("../modules/auth/auth.router");
app.use("/auth", authRouter);



module.exports = app