const Unauthorized = require("../exception/unauthorized.exception");

const auth = (req, res, next) => {
  try {
    next(); //login pass
  } catch (exception) {
    next(new Unauthorized());
    // res.status(401).json
  }
};

module.exports = auth;
