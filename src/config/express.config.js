const express = require("express");
const app = express();
const router = express.Router();
router.use("/home", (req, res, next) => {
  res.json({ result: "Home", message: "Message", meta: null });
});

const authRouter = require("../modules/auth/auth.router");
app.use("/auth", authRouter);
module.exports = app; //exporting the express frameworks
