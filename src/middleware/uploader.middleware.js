const multer = require("multer");
const fs = require("fs");
const { randomString } = require("../utilities/helper");
const ValidationError = require("../exception/validation.exception");
const myStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    const path = "./public/uploads/";

    if (!fs.existsSync(path)) {
      fs.mkdirSync(path, { recursive: true });
    }
    cb(null, path);
  },
  filename: (req, file, cb) => {
    const ext = file.originalname.split(".").pop();
    let fileName = Date.now() + "-" + randomString(10) + "." + ext;
    console.log(fileName);
    cb(null, fileName);
  },
});
const imageFilter = (req, file, cb) => {
  const ext = file.originalname.split(".").pop();
  if (
    ["jpg", "jpeg", "png", "svg", "webp", "bmp", "gif"].includes(
      ext.toLowerCase()
    )
  ) {
    cb(null, true);
  } else {
    cb(
      new ValidationError({
        data: { image: "Image file not supported" },
      })
    );
  }
};
const uploader = multer({
  storage: myStorage,
  fileFilter: imageFilter,
  limits: {
    fileSize: 2000000,
  },
});

module.exports = uploader;
