
const jwt = require("jsonwebtoken")
const Authentication =(req,res,next) => {
   const token = req.headers.authorization.split(" ")[1]

   jwt.verify(token, process.env.KEY , function(err, decoded) {
    if(err){
        res.send({"msg":"Something went wrong ... "})
    }
    else{
        // console.log(decoded)
        req.body.userId = decoded.userId
        next()
    }
  
  });
}

module.exports = { Authentication }