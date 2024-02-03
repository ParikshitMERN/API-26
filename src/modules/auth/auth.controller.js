class AuthController {
  registerfunction = async (req, res, next) => {
    // res.end("This is register");

    try {
      const data = req.body;
      data.file = req.file.filename;
      res.json({
        result: data,
        message: "Success",
        meta: null,
      });
    } catch (exception) {
      console.log("Registerfun Error", exception);
      next({
        data: {
          name: "Name is not Registered",
        },
        code: 422,
        message: "Validation Error",
      });
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
      next({
        data: { name: "Username not found" },
        code: 422,
        message: "Validation Error",
      });
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
