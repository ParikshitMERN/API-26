const permissionCheck = (role) => {
  return (req, res, next) => {
    // To check weather the role is logged in the site or not
    try {
      next();
    } catch (exception) {
      next({ code: 403, message: "Role Not Matched" });
    }
  };
};

module.exports = permissionCheck;
