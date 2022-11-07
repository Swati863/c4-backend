
const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
    userId : {type:String,required:true},
    taskName : {type:String,required:true},
    tag: {type:String,required:true},
    status : {type:Boolean,default:false},
})

const TodoModel = mongoose.model("todo",todoSchema)

module.exports = { TodoModel}