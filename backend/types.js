const zod = require("zod");

const createTodo = zod.object({
    title: zod.string().min(1),
    description: zod.string().min(1),
    completed: zod.boolean().default(false)
});

const updateTodo = zod.object({
    id: zod.string()
});

module.exports = {
    createTodo,
    updateTodo
};
