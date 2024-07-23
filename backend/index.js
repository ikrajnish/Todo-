const express = require("express");
const {createTodo,updateTodo} =require("./types.js");
const {todo} = require("./db")
const app = express();
const PORT =3000;




app.post("/todo",async function(req,res){
    const createPayload = req.body;
    const parsedPayload = createTodo.safeParse(createPayload);
    if(!parsedPayload.success){
        res.status(411).json({
            msg: "You sent the wrong inputs"
        })
        return;
    }
    await todo.create({
        title: createPayload.title,
        description: createPayload.description,
        completed: false
    })

    res.json({
        msg: "Todo created"
    })
});

app.get("/todos",async function(req,res){
    const todos = await todo.find({});
    console.log(todos);
    res.json({
        todos
    })
});

app.put("/completed",async function(req,res){
    const updatePayload = req.body;
    const parsedPayload = updatePayload.safeParse(updatePayload);
    if(!parsedPayload.success){
        res.status(411).json({
            msg: "You sent the wrong inputs"
        })
        return;
    }
    await todo.update({
        _id: req.body.id
    }),{
        completed: true
    }
    res.json({
        msg: "Todo marked as completed"
    })
});

app.listen(PORT);