const auth = (req, res, next) => {
  try{
    next(); //login pass
  
  }catch(exception){
    res.status(401).json
  }
};

module.exports = auth;
