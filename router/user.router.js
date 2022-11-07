
const { Router } = require("express")
const bcrypt = require("bcrypt");
const { UserModel } = require("../models/user.models");
const userRouter = Router();
const jwt = require("jsonwebtoken")
require("dotenv").config();


userRouter.post("/signup",async(req,res)=>{
    const {email,password} = req.body;
    if(email && password ) {
        bcrypt.hash(password, 5, async function (err, hash) {  
            if(err){
                res.send({ msg: "Incorrect credentials.." });
            }
            else{
                const newUser = new UserModel({ 
                    email:email,
                   password : hash,
                });
                await newUser.save()
                res.send({ msg: "Signup Succesfull.." });
            }
         })
    }
})


userRouter.post("/login",async(req,res)=>{
   const {email,password } = req.body
   const user = await UserModel.findOne({email})
   bcrypt.compare(password, user.password , function(err, result) {
    if(result){
  const  token = jwt.sign({email:email, userId:user._id},process.env.KEY);
  res.send({"msg":"Loggin Succes...","token":token}) 
    }
    else{
        res.send({"msg":"Login Failed..."})
    }
  
});
})


module.exports = { userRouter }


