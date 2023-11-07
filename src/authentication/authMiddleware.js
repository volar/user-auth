

//import jsonwebtoken and config
const jwt = require('jsonwebtoken');
const config = require('../../config');


//This function verifyToken will verify the token coming from headers 
const verifyToken = (req, res, next) => {
  // Getting the authorization header
  const token = req.headers["authorization"];
  
  //token is missing
  if (!token) {
    return res.status(403).send({ error: "Token is missing" });
  }
 
//Synchronously verify given token using a secret or a public key to get a decoded token 
 try {
    //passing the decoded dataof users and passing into claims key
    // claims ois a custom key in request object
    const decoded = jwt.verify(token, config.AUTH_SECRET);
    req.claims = decoded;
  }
  catch (err) {
    return res.status(401).send({ error: "Token is invalid" });
  }
  //return next
  return next();
};

module.exports = verifyToken;