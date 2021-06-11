const jwt = require('jsonwebtoken');
require('dotenv/config');

function auth(req,res,next) {
  const token = req.header('x-auth-token');
  if(!token) return res.status(401).send("Access denied. No token present..")
  
  try{
    const payload = jwt.verify(token,process.env.JWT_SECRET_KEY);
    req.user = payload;
    next();
    
  }catch(error){
    res.status(400).send("Invalid token!")
  }
  
}

module.exports = auth;




