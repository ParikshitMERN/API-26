const multer = require("multer");
const fs = require("fs");
const { randomString } = require("../utilities/helper");
const myStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const path = "./public/uploads";
    if (fs.existsSync(path)) {
      fs.mkdirSync(path, { recursive: true });
    }
    cb(null, path);
  },
  filename: (req, file, cb) => {
    const ext = file.originalname.split(".").pop();
    let fileName = Date.now() + "-" + randomString(10) + "." + ext;
    cb(null, fileName);
  },
});
const uploader = multer({
  storage: myStorage,
});

module.exports = uploader;
