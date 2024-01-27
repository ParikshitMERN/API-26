const express = require("express");
const app = express();

const authRouter = require("../modules/auth/auth.router");
app.use("/auth", authRouter);
module.exports = app; //exporting the express frameworks
