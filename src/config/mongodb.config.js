require("dotenv").config();

const mongoose = require("mongoose");

mongoose
  .connect(process.env.MONGODB_URL, {
    dbName: process.env.MONGODB_NAME,
    autoCreate: true,
    autoIndex: true,
  })
  .then(() => {
    console.log("DB server connected.....");
  })
  .catch((e) => {
    console.log("DB Server connection error");
    console.log(e);
    process.exit(1);
  });
