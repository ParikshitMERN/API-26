class ValidationError extends Error {
  constructor({ data = null, message = "Validaton Failed", code = 422 }) {
    super();
    this.data = data;
    this.message = message;
    this.code = code;
  }
}

module.exports = ValidationError;
