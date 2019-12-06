const express = require("express");
const Todo = require("../models/Todo");
const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (err) {
    res.json({ message: err });
  }
});

router.post("/", async (req, res) => {
  const todo = new Todo({
    title: req.body.title,
    isCompleted: req.body.isCompleted
  });
  try {
    const savedTodo = await todo.save();
    res.json(savedTodo);
  } catch (err) {
    res.json({ message: err });
  }
});

router.delete("/:todoId", async (req, res) => {
  try {
    const todo = await Todo.deleteOne({ _id: req.params.todoId });
    res.json(todo);
  } catch (err) {
    res.json({ message: err });
  }
});

router.patch("/:todoId", async (req, res) => {
  try {
    const updateTodo = await Todo.updateOne(
      { _id: req.params.todoId },
      { $set: { isCompleted: req.body.isCompleted } }
    );
    res.json(updateTodo);
  } catch (err) {
    res.json({ message: err });
  }
});

module.exports = router;
