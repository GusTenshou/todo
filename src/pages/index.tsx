import React, { useState } from 'react';

interface Todo {
  id: number;
  description: string;
  startDate: string;
  endDate: string;
  priority: string;
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [description, setDescription] = useState<string>('');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [priority, setPriority] = useState<string>('Low');

  const addTodo = () => {
    if (description.trim() && startDate && endDate && priority) {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          description: description.trim(),
          startDate,
          endDate,
          priority,
        },
      ]);
      setDescription('');
      setStartDate('');
      setEndDate('');
      setPriority('Low');
    }
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  return (
    <div className="todo-container">
      <h1 className="title">To Do</h1>
      <div className="input-container">
        <input
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="To Do description"
        />
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <select value={priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <button onClick={addTodo}>Add To Do</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>To Do</th>
            <th>Date (Start)</th>
            <th>Date (Final)</th>
            <th>Priority</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.id}>
              <td>{todo.description}</td>
              <td>{todo.startDate}</td>
              <td>{todo.endDate}</td>
              <td>{todo.priority}</td>
              <td>
                <button onClick={() => deleteTodo(todo.id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
