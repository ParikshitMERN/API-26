const auth = (req, res, next) => {
  try {
    next(); //login pass
  } catch (exception) {
    next({ code: 401, message: "Unable to Login" });
    // res.status(401).json
  }
};

module.exports = auth;
