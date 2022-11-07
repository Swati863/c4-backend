
const { Router } = require("express")
const { Authentication } = require("../middleware/authentication");
const { TodoModel } = require("../models/todo.models");
const todoRouter  = Router()
require("dotenv").config();



todoRouter.get("/",Authentication,async(req,res)=>{
    const {userId} = req.body
    const getTodo = await TodoModel.find({ userId })
    res.send(getTodo)
})

todoRouter.get("/:todoId",Authentication,async(req,res)=>{
    const {userId} = req.body
    const { todoId } = req.params;
    const getSpecificTodo = await TodoModel.find({  userId:userId,_id:req.params.todoId })
    res.send(getSpecificTodo)
})

todoRouter.get("/",Authentication,async(req,res)=>{
    console.log(req.query)
    const {userId} = req.body
    const q = req.query
   
    const getFilterTodo = await TodoModel.find({  userId:userId,status:q.status })
    res.send( getFilterTodo)
})

todoRouter.get("/?status=q1&tag=q2",Authentication,async(req,res)=>{
    console.log(req.query)
    const {userId} = req.body
    const q = req.query
    const getFilteredTodo = await TodoModel.find({  userId:userId,status:q.status,tag:q.tag })
    res.send( getFilteredTodo)
})

todoRouter.post("/create",Authentication,async(req,res)=>{
    const { userId } = req.body
    const newTodo = new TodoModel({ ...req.body , userId })
    await newTodo.save()
    res.send({"msg":"New Todo added"})
})

todoRouter.patch("/update/:todoId",Authentication,async(req,res)=>{
    const {userId} = req.body
    const { todoId } = req.params;
    const payload = req.body;

    const updateTodo = await TodoModel.findOneAndUpdate({ userId:userId,_id:req.params.todoId },{...payload})
    console.log(updateTodo)
    res.send({"msg":"Todo Updated"})
})

todoRouter.delete("/remove/:todoId",Authentication,async(req,res)=>{
    const {userId} = req.body
    const { todoId } = req.params;

    const deleteTodo = await TodoModel.findOneAndDelete({ userId:userId,_id:req.params.todoId })
    console.log(deleteTodo)
    res.send({"msg":"Todo deleted"})
})

module.exports = { todoRouter }


