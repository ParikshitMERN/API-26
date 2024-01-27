class AuthController {
  registerfunction = (req, res, next) => {
    // res.end("This is register");
    res.json({
      result: null,
      message: "Your Account Has Been Created",
      meta: null,
    });
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
  }

  updatepassword = (req, res) => {
    res.end("Reset Password");
  }

  login = (req, res) => {
    //post since it creates the data
    res.end("This is Login");
  }

  logout = (req, res) => {
    res.end("LOGOUT");
  }

  admin = (req, res, next) => {
    res.json({
      result: null,
      message: "Admin Panel",
      meta: null,
    });
  }
  profile = (req, res) => {
    res.end("Profile Access");
  }
  password = (req, res) => {
    res.end("This is password");
  }
  setpassword = (req, res) => {
    //: is used to get or set dynamic values for eg userID can be dyncamic
    //userID => userId
  }
  delete = (req, res) => {
    res.end("This is home");
  }
  main = (request, response) => {
    response.end("Hello World");
  }
}

const authctrl = new AuthController();

module.exports = authctrl;
