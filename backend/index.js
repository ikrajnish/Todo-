const express = require("express");
const bodyParser = require("body-parser");
const {createTodo,updateTodo} =require("./types.js");
const {todo} = require("./db");
require('dotenv').config();

const app = express();
app.use(bodyParser.json());

const PORT =3000;
const mongoose = require("mongoose");

mongoose.connect(process.env.MONGO);




app.post("/todo", async function(req, res) {
    const createPayload = req.body;
    const parsedPayload = createTodo.safeParse(createPayload);
  
    if (!parsedPayload.success) {
      return res.status(400).json({
        msg: "Invalid input format",
        errors: parsedPayload.error // Optionally send the validation errors
      });
    }
  
    try {
      const newTodo = await todo.create({
        title: createPayload.title,
        description: createPayload.description,
        completed: false
      });
  
      res.status(201).json({
        msg: "Todo created",
        todo: newTodo // Optionally send the created todo item in the response
      });
    } catch (error) {
      console.error("Error creating todo:", error);
      res.status(500).json({
        msg: "Failed to create todo",
        error: error.message // Optionally send the error message
      });
    }
  });

app.get("/todos",async function(req,res){
    const todos = await todo.find({});
    console.log(todos);
    res.json({
        todos
    })
});

app.put("/completed", async function(req, res) {
    const updatePayload = req.body;
    const parsedPayload = updateTodo.safeParse(updatePayload);
  
    if (!parsedPayload.success) {
      return res.status(400).json({
        msg: "Invalid input format",
        errors: parsedPayload.error // Optionally send the validation errors
      });
    }
  
    try {
      const updatedTodo = await todo.findOneAndUpdate(
        { _id: updatePayload.id },
        { completed: true },
        { new: true } // To return the updated document
      );
  
      if (!updatedTodo) {
        return res.status(404).json({
          msg: "Todo not found"
        });
      }
  
      res.json({
        msg: "Todo marked as completed",
        todo: updatedTodo
      });
    } catch (error) {
      console.error("Error marking todo as completed:", error);
      res.status(500).json({
        msg: "Failed to mark todo as completed",
        error: error.message
      });
    }
  });

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)});