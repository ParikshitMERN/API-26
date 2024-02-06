const ValidationError = require("../exception/validation.exception");

const bodyValidator = (schema) => {
  return async (req, res, next) => {
    try {
      const data = req.body;
      await schema.validateAsync(data);
      next();
    } catch (exception) {
      console.log(exception);
      const errorMsg = {};
      exception.details.map((err) => {
        errorMsg[err.context.label] = err.message;
      });
      next(new ValidationError({ data: errorMsg }));
    }
  };
};

module.exports = bodyValidator;
