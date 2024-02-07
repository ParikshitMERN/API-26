// const express = require("express");
// const app = express.Router();
const app = require("express").Router(); //Converting above two lines in one single line
const auth = require("../../middleware/auth.middleware");

const permissionCheck = require("../../middleware/rbac.middleware");
const { ROLES } = require("../../config/constant.config");
// const { registerfunction } = require("./auth.controller");
const authctrl = require("./auth.controller");
const bodyValidator = require("../../middleware/validator.middleware");
const {
  registerSchema,
  otpVerifySchema,
  passwordSetSchema,
} = require("./auth.request");
const { loginSchema } = require("./auth.request");
const uploader = require("../../middleware/uploader.middleware");

app.post(
  "/register",
  uploader.single("profile"),
  // uploader.array("cover"),
  bodyValidator(registerSchema),
  authctrl.registerfunction
); //Verify
app.post("/login", authctrl.login);
app.post("/verify-otp/", bodyValidator(otpVerifySchema), authctrl.verify_otp);
app.post(
  "/activate/:token",
  bodyValidator(passwordSetSchema),
  authctrl.activateUser
);

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

app.put("/set-password/:userID", authctrl.setpassword);
app.delete(
  "/user/:userID",
  auth,
  permissionCheck(ROLES.ADMIN),
  authctrl.delete
);

app.use("/", authctrl.main); //root path

module.exports = app;
