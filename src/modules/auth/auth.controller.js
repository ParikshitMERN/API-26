require("dotenv").config();
const AppError = require("../../exception/app.exception");
const { randomString } = require("../../utilities/helper");
const emailSvc = require("../../services/email.service");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
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
        res.json({ data: userRegister, message: "Test Failed", meta: null });
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

  verify_otp = (req, res, next) => {
    const userDetail = {
      name: "Parikshit Maharjan",
      email: "parikshit@gmail.com",
      role: "admin",
      otp: "6ALtlr",
      expiryTime: "2024-02-07T14:04:07.117Z",
      status: "inactive",
      authToken: randomString(100),
    };
    res.json({
      result: userDetail,
      message: "Your Account Has Been Verified",
      meta: null,
    });
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
