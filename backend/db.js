const mongoose = require("mongoose");


mongoose.connect("mongodb+srv://krajnish1103:test123@cluster0.pamabzk.mongodb.net/todos");

const todoSchema = mongoose.Schema({
    title: String,
    description: String,
    completed: Boolean
});

const todo = mongoose.model('todos', todoSchema);

module.exports = {
    todo
}