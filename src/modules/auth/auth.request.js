const Joi = require("joi");
const registerSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  role: Joi.string().regex(/^(admin|seller|customer)$/),
  email: Joi.string().email().required(),
});

const loginSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  password: Joi.string().min(2).max(50).required(),
});
module.exports = {
  registerSchema,
  loginSchema,
};
