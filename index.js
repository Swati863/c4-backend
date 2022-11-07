const express = require("express");
const { connection } = require("./config/db");
const { todoRouter } = require("./router/todo.router");
const { userRouter } = require("./router/user.router");
const app = express();
app.use(express.json())
require("dotenv").config();

const port = process.env.PORT || 5500

app.get("/",(req,res)=>{
    res.send("Welcome to Our Todo App")
})

app.use("/user",userRouter)
app.use("/todos",todoRouter)
 
app.listen(port,async()=>{
    try{
        await connection
        console.log(`Listening on ${port}`)
    }
    catch(err){
        console.log(err)
    }
})