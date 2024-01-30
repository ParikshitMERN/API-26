const AccessDenied = require("../exception/accessDenied.exception");

const permissionCheck = (role) => {
  return (req, res, next) => {
    // To check weather the role is logged in the site or not
    try {
      next();
    } catch (exception) {
      next(new AccessDenied());
    }
  };
};

module.exports = permissionCheck;
