const express = require("express");
const app = express();

const router = require("../routes/router");
//body parser can be defined as the handeling the conversion of the request sent by client in our backend server.
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

app.use(router);

app.use((req, res, next) => {
  next({ code: 404, message: "Not Found" });
});

//error handling middleware

app.use((error, req, res, next) => {
  console.log("Garbage Collector", error);
  let statusCode = error.code ?? 500;
  let data = error.data ?? null;
  let message = error.message ?? "Internal Server Error";
  res.status(statusCode).json({
    result: data,
    message: message,
    meta: null,
  });
});
module.exports = app; //exporting the express frameworks
