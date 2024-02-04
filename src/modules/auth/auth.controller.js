const AppError = require("../../exception/app.exception");
const { randomString } = require("../../utilities/helper");
const emailSvc = require("../../services/email.service");
class AuthController {
  registerfunction = async (req, res, next) => {
    // res.end("This is register");

    try {
      const data = req.body;
      // data.file = req.file.filename;

      // data.activationToken = randomString(100);
      data.otp = randomString(6); //expiry date
      const timeAfterTwohours = new Date(Date.now() + (60 * 2 + 60 * 1000));
      data.expiryTime = timeAfterTwohours;
      data.status = "inactive";

      let userRegister = data;
      if (userRegister) {
        //success
        const response = await emailSvc.sendEmail({
          to: data.email,
          subject: "Activate Your Account",
          message: `Dear ${data.name}<br/>,
          Your otp code is: <b> ${data.otp}</b><br/>,
          Your otp code is going to expore on <b>${data.expiryTime}</b><br/>
          Verify your account within 2 hours`,
        });
        res.json({ data: response, message: "Register Failed", meta: null });
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

  login = async (req, res, next) => {
    try {
      const data = req.body;

      res.json({
        result: null,
        message: "You Have Been Logged In Successfully",
        meta: null,
      });
    } catch (exception) {
      console.log("Login Error", exception);
      next(exception);
    }
  };

  verify_otp = (req, res, next) => {
    res.json({
      result: null,
      message: "Your Account Has Been Verified",
      meta: null,
    });
  };
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
  profile = (req, res) => {
    res.end("Profile Access");
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
