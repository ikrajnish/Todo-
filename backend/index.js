const express = require("express");
const {createTodo,updateTodo} =require("../types.js")
const app = express();
const PORT =3000;

app.use(express.json());

app.post("/todo", function(req,res){
    const createPayload = req.body;
    const parsedPayload =req.body;
    if(!parsedPayload.success){
        res.status(411).json({
            msg: "You sent the wrong inputs"
        })
        return;
    }
});

app.get("/todos", function(req,res){
    
});

app.put("/completed", function(req,res){
    const createPayload = req.body;
    const parsedPayload =req.body;
    if(!parsedPayload.success){
        res.status(411).json({
            msg: "You sent the wrong inputs"
        })
        return;
    }
});

app.listen(PORT);