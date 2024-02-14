const AppError = require("../../exception/app.exception");
const { randomString } = require("../../utilities/helper");
const UserModel = require("../user/user.model");
const emailSvc = require("../../services/email.service");
class AuthService {
  transformDataToRegister = (payload, file = null) => {
    const data = payload;
    if (file) {
      data.image = req.file.filename;
    }

    // data.activationToken = randomString(100);
    data.otp = randomString(6); //expiry date
    const timeAfterTwohours = new Date(Date.now() + (60 * 2 + 60 * 1000));
    data.expiryTime = timeAfterTwohours;
    data.status = "inactive";
    return data;
  };
  registerUser = async (data) => {
    try {
      const user = new UserModel(data);
      return await user.save(); //insert query
    } catch (exception) {
      if (+exception.code === 11000) {
        throw new AppError({
          data: null,
          message: "Email Should be Unique",
          code: 400,
        });
      }
      throw exception;
    }
  };

  sendRegistrationEmail = async (email, name, token, expiryTime) => {
    try {
      const response = await emailSvc.sendEmail({
        to: email,
        subject: "Activate Your Account",
        message: `Dear ${name}<br/>,
            Your otp code is: <b> ${token}</b><br/>,
            Your otp code is going to expore on <b>${expiryTime}</b><br/>
            Verify your account within 2 hours`,
      });
    } catch (mailOptExcep) {
      console.log(mailOptExcep);
      throw new AppError({
        data: null,
        message: "Erroe Sendinf Email",
        code: 400,
      });
    }
  };
  verifyOtpCode = async ({ email, otp }) => {
    try {
      const userDetail = await UserModel.findOne({
        email: email,
        otp: otp,
      });
      return userDetail;
    } catch (exception) {
      throw exception;
    }
  };
  updateUser = async (id, data) => {
    try {
      const updated = UserModel.findByIdAndUpdate(id, {
        $set: data,
      });
      return updated;
    } catch (exception) {
      throw exception;
    }
  };
}

const authSvc = new AuthService();
module.exports = authSvc;
