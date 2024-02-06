const Joi = require("joi");
const registerSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  role: Joi.string().regex(/^(admin|seller|customer)$/),
  email: Joi.string().email().required(),
});
const otpVerifySchema = Joi.object({
  email: Joi.string().email().required(),
  otp: Joi.string().min(6).required(),
});

const loginSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  password: Joi.string().min(2).max(50).required(),
});

const passwordSetSchema = Joi.object({
  password: Joi.string().min(8).required(),
  confirmpassword: Joi.string().valid(Joi.ref("password")).required().messages({
    "any.only": "Password Does not match",
  }),
});
module.exports = {
  registerSchema,
  loginSchema,
  otpVerifySchema,
  passwordSetSchema,
};
