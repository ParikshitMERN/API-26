require("dotenv").config();
const AppError = require("../../exception/app.exception");
const { randomString } = require("../../utilities/helper");
const emailSvc = require("../../services/email.service");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const authSvc = require("./auth.service");
class AuthController {
  registerfunction = async (req, res, next) => {
    // res.end("This is register");

    try {
      const data = authSvc.transformDataToRegister(req.body, req.file);
      let userRegister = await authSvc.registerUser(data);
      if (userRegister) {
        //success
        await authSvc.sendRegistrationEmail(
          data.email,
          data.name,
          data.otp,
          data.expiryTime
        );
        res.json({
          data: userRegister,
          message: "Your accound has been registered",
          meta: null,
        });
      } else {
        //fail
        throw new AppError({
          data: null,
          message: "Registration Fail",
          code: 400,
        });
      }
    } catch (exception) {
      console.log("Registerfun Error", exception);
      next(exception);
    }
  };

  verify_otp = async (req, res, next) => {
    try {
      const { email, otp } = req.body;
      const userDetail = await authSvc.verifyOtpCode({
        email: email,
        otp: otp,
      });
      if (!userDetail) {
        throw new AppError({ message: "Incorrect OTP", code: 400 });
      } else {
        //expirytime
        const now = Date.now();
        const expiryTime = userDetail.expiryTime.getTime();
        if (expiryTime < now) {
          throw new AppError({ message: "Token Expired", code: 400 });
        } else {
          const token = randomString(100);
          const response = await authSvc.updateUser(userDetail._id, {
            authtoken: token,
          });
          if (response) {
            res.json({
              result: token,
              message: "OTP Code Verified",
              meta: null,
            });
          } else {
            throw new AppError({ message: "User Not Found", code: 400 });
          }
        }
      }
    } catch (exception) {
      console.log("Verifyotp", exception);
      next(exception);
    }
  };
  activateUser = (req, res, next) => {
    try {
      let token = req.params.token;
      let password = req.body.password;

      const hash = bcrypt.hashSync(password, 10);

      const userDetail = {
        name: "Parikshit Maharjan",
        email: "parikshit@gmail.com",
        role: "admin",
        otp: null,
        expiryTime: null,
        status: "active",
        authToken: null,
        password: hash,
      };
      res.json({
        result: userDetail,
        message: "Your Password Has Been Set Successfully",
        meta: null,
      });
    } catch (exception) {
      consolel.log(exception);
      next(
        new AppError({
          data: exception,
          message: "Activation Failed",
          code: 500,
        })
      );
    }
  };

  login = async (req, res, next) => {
    try {
      let data = req.body;
      const userDetail = {
        _id: "hexcode-->ObjectId",
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

      const verify = bcrypt.compareSync(data.password, userDetail.password);
      // const verify_email = bcrypt.compareSync(data.email, userDetail.email);
      if (verify) {
        const payload = { id: userDetail._id };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: Date.now() + 7200000,
        });

        const refreshToken = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: "1 day",
        });

        res.json({
          result: {
            token: token,
            type: "Bearer",
            refreshToken: refreshToken,
          },
          message: "You Have Been Logged In",
          meta: null,
        });
      } else {
        throw new AppError({
          data: null,
          message: "Credential Doesnot Match",
          code: 400,
        });
      }
    } catch (exception) {
      console.log("Login Error", exception);
      next(exception);
    }
  };

  profile = (req, res, next) => {
    let user = req.authUser;
    res.json({
      result: user,
      message: "Your Profile",
      meta: null,
    });
  };

  l;
  token = (req, res, next) => {
    //tokenID => token
    // request url -> params
    const params = req.params;

    res.json({
      result: params,
      message: "You Have Successfully Activated",
      meta: null,
    }); //res.end returns the data in text formtat res.json sent the value in json format
  };

  forgotpassword = (req, res) => {
    res.end("Forgot Password");
  };

  updatepassword = (req, res) => {
    res.end("Reset Password");
  };

  logout = (req, res) => {
    res.end("LOGOUT");
  };

  admin = (req, res, next) => {
    res.json({
      result: null,
      message: "Admin Panel",
      meta: null,
    });
  };

  password = (req, res) => {
    res.end("This is password");
  };
  setpassword = (req, res) => {
    //: is used to get or set dynamic values for eg userID can be dyncamic
    //userID => userId
  };
  delete = (req, res) => {
    res.end("This is home");
  };
  main = (request, response) => {
    response.end("Hello World");
  };
}

const authctrl = new AuthController();

module.exports = authctrl;
