const express = require("express");
// const app = express();

const app = express.Router();
//Routing
//Register
app.post("/register", (req, res, next) => {
  // res.end("This is register");
  res.json({
    result: null,
    message: "Your Account Has Been Created",
    meta: null,
  });
});
//Verify
app.post("/verify-otp/", (req, res, next) => {
  res.end("1234");
});
app.post("/activate/:token", (req, res, next) => {
  //tokenID => token
  // request url -> params
  const params = req.params;

  res.json({
    result: params,
    message: "You Have Successfully Activated",
    meta: null,
  }); //res.end returns the data in text formtat res.json sent the value in json format
});

//send email for forget password
app.post("/forgot-password", (req, res) => {
  res.end("Forgot Password");
});
//set new password
app.post("/update-password/:token", (req, res) => {
  res.end("Reset Password");
});
//Login
app.post("/login", (req, res) => {
  //post since it creates the data
  res.end("This is Login");
});
app.get("/logout", (req, res) => {
  res.end("LOGOUT");
});
app.get("/me", (req, res) => {
  res.end("Profile Access");
});
app.get("/password", (req, res) => {
  res.end("This is password");
});
app.put("/user-update/:userID", (req, res) => {
  res.end("Updated");
});

app.put("/set-password/:userID", (req, res) => {
  //: is used to get or set dynamic values for eg userID can be dyncamic
  //userID => userId
});
app.delete("/user/:userID", (req, res) => {
  res.end("This is home");
});
app.use("/", (request, response) => {
  response.end("Hello World");
}); //root path

module.exports = app;
