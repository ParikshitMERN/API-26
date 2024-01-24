const express = require("express");
const app = express();
//Routing
//Register
app.post("/register", (req, res) => {
  res.end("This is register");
});
//Verify
app.post("/verify-otp/", (req, res) => {
  res.end("1234");
});
app.post("/activate/:token", (req, res) => {
  //tokenID => token
  res.end("Activated");
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
