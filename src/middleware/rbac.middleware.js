const permissionCheck = (role) => {
  return (req, res, next) => {
    // To check weather the role is logged in the site or not
    try{
      next();
    }catch(exception){
      res.status(403).json()
    }
    
  };
};

module.exports = permissionCheck;
