// const express = require("express");
// const app = express.Router();
const app = require("express").Router(); //Converting above two lines in one single line
const auth = require("../../middleware/auth.middleware");

const permissionCheck = require("../../middleware/rbac.middleware");
const { ROLES } = require("../../config/constant.config");
// const { registerfunction } = require("./auth.controller");
const authctrl = require("./auth.controller");

app.post("/register", authctrl.registerfunction); //Verify
app.post("/verify-otp/", authctrl.verify_otp);
app.post("/activate/:token", authctrl.token);

//send email for forget password
app.post("/forgot-password", authctrl.forgotpassword);
//set new password
app.post("/update-password/:token", authctrl.updatepassword);
//Login
app.post("/login", authctrl.login);
app.get("/logout", auth, authctrl.logout);
app.get("/admin", auth, permissionCheck(ROLES.ADMIN), authctrl.admin);
app.get("/me", auth, authctrl.profile);
app.get("/password", authctrl.password);
app.put("/user-update/:userID", (req, res) => {
  res.end("Updated");
});

app.put("/set-password/:userID",authctrl.setpassword);
app.delete("/user/:userID", auth, permissionCheck(ROLES.ADMIN),authctrl.delete);

app.use("/", authctrl.main); //root path

module.exports = app;
