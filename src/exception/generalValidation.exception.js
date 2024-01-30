class GeneralValidationError extends Error {
  constructor({ message = "Validaton Failed" }) {
    super();
    this.data = null;
    this.message = message;
    this.code = 400;
  }
}

module.exports = GeneralValidationError;
