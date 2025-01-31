import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "https://your-render-backend-url.onrender.com/api/todos"; // Замените на ваш URL бэкенда

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");

  // Получить задачи
  const fetchTodos = async () => {
    const response = await axios.get(API_URL);
    setTodos(response.data);
  };

  // Добавить задачу
  const addTodo = async () => {
    if (newTodo.trim()) {
      const response = await axios.post(API_URL, { text: newTodo });
      setTodos([...todos, response.data]);
      setNewTodo("");
    }
  };

  // Удалить задачу
  const deleteTodo = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="App">
      <h1>To-Do List</h1>
      <div>
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Add a new task"
        />
        <button onClick={addTodo}>Add</button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>
            {todo.text}
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
