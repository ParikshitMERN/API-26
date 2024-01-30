class Unauthorized extends Error {
  constructor() {
    super();
    this.data = null;
    this.message = "Unauthorized";
    this.code = 401;
  }
}

module.exports = Unauthorized;
