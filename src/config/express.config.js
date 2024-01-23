const express = require("express");
const app = express();

//Routing
app.use("/login", (req, res) => {
  res.end("This is Login");
});

app.use("/about", (req, res) => {
  res.end("This is about");
});
app.use("/", (request, response) => {
  response.end("Hello World");
}); //root path
module.exports = app; //exporting the express frameworks
