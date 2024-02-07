require("dotenv").config();
const AppError = require("../exception/app.exception");
const Unauthorized = require("../exception/unauthorized.exception");
const jwt = require("jsonwebtoken");
const auth = (req, res, next) => {
  try {
    let token = req.headers["authorization"];
    if (!token) {
      throw new AppError({
        data: null,
        message: "Token Is Required",
        code: 401,
      });
    } else {
      token = token.split(" ").pop();
      if (!token) {
        throw new AppError({
          data: null,
          message: "Token Is Required",
          code: 401,
        });
      } else {
        const data = jwt.verify(token, process.env.JWT_SECRET);
        const userDetail = {
          name: "Parikshit Maharjan",
          email: "parikshit@gmail.com",
          role: "admin",
          otp: null,
          expiryTime: null,
          status: "active",
          authToken: null,
          password:
            "$2a$10$l4wCf1CGPbY4z2boEwNGceCXZJX12UhcbFxzGzKPxiHWY/VnlyaAu",
        };

        req.authUser = userDetail;
        next();
      }
    }
  } catch (exception) {
    if (exception instanceof jwt.JsonWebTokenError) {
      exception.code = 401;
      exception.message = exception.message;
      exception.data = null;
    }
    next(exception);
    // res.status(401).json
  }
};

module.exports = auth;
