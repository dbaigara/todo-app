const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;

//app.use(cors());
app.use(cors({ origin: "https://your-frontend.vercel.app" }));
app.use(express.json());

let todos = [];

// Получить все задачи
app.get("/api/todos", (req, res) => {
  res.json(todos);
});

// Добавить новую задачу
app.post("/api/todos", (req, res) => {
  const { text } = req.body;
  if (text) {
    const newTodo = { id: Date.now(), text, completed: false };
    todos.push(newTodo);
    res.status(201).json(newTodo);
  } else {
    res.status(400).json({ error: "Text is required" });
  }
});

// Удалить задачу
app.delete("/api/todos/:id", (req, res) => {
  const { id } = req.params;
  todos = todos.filter((todo) => todo.id !== Number(id));
  res.status(204).send();
});

// Запуск сервера
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
