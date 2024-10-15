import React, { useState, useEffect } from 'react';

interface Todo {
  id: number;
  Name: string;         
  Description: string;  
  DateStart: string;    
  DateEnd: string;      
  Priority: string;     
}

const App: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [Name, setName] = useState<string>('');  // Campo de nome
  const [Description, setDescription] = useState<string>('');  // Campo de descrição
  const [DateStart, setDateStart] = useState<string>('');  // Campo de data de início
  const [DateEnd, setDateEnd] = useState<string>('');  // Campo de data final
  const [Priority, setPriority] = useState<string>('Low');  // Campo de prioridade

  // Função para buscar todos os ToDos
  const fetchTodos = async () => {
    try {
      const response = await fetch('/api/todo');
      const data = await response.json();
      setTodos(data);
    } catch (error) {
      console.error('Error fetching ToDos:', error);
    }
  };

  // Função para adicionar um novo ToDo
  const addTodo = async () => {
    if (Name.trim() && Description.trim() && DateStart && DateEnd && Priority) {
      try {
        const response = await fetch('/api/todo', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            Name,         
            Description,  
            DateStart,    
            DateEnd,      
            Priority,     
          }),
        });

        if (response.ok) {
          const newTodo = await response.json();
          setTodos((prev) => [...prev, newTodo]);
          setName('');
          setDescription('');
          setDateStart('');
          setDateEnd('');
          setPriority('Low');
        } else {
          console.error('Error adding ToDo');
        }
      } catch (error) {
        console.error('Error adding ToDo:', error);
      }
    }
  };

  // Função para deletar um ToDo
  const deleteTodo = async (id: number) => {
    try {
      const response = await fetch(`/api/todo?id=${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setTodos(todos.filter((todo) => todo.id !== id));
      } else {
        console.error('Error deleting ToDo');
      }
    } catch (error) {
      console.error('Error deleting ToDo:', error);
    }
  };

  // Fetch ToDos quando o componente monta
  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="todo-container">
      <h1 className="title">To Do</h1>
      <div className="input-container">
        <input
          type="text"
          value={Name}
          onChange={(e) => setName(e.target.value)}
          placeholder="To Do Name"
        />
        <input
          type="text"
          value={Description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="To Do Description"
        />
        <input
          type="date"
          value={DateStart}
          onChange={(e) => setDateStart(e.target.value)}
        />
        <input
          type="date"
          value={DateEnd}
          onChange={(e) => setDateEnd(e.target.value)}
        />
        <select value={Priority} onChange={(e) => setPriority(e.target.value)}>
          <option value="Low">Low</option>
          <option value="Medium">Medium</option>
          <option value="High">High</option>
        </select>
        <button onClick={addTodo}>Add To Do</button>
      </div>

      <table>
        <thead>
          <tr>
            <th>To Do Name</th>
            <th>Description</th>
            <th>Date Start</th>
            <th>Date End</th>
            <th>Priority</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.id}>
              <td>{todo.Name}</td>  {/* Exibindo o campo "Name" */}
              <td>{todo.Description}</td>  {/* Exibindo o campo "Description" */}
              <td>{todo.DateStart}</td>  {/* Exibindo o campo "DateStart" */}
              <td>{todo.DateEnd}</td>  {/* Exibindo o campo "DateEnd" */}
              <td>{todo.Priority}</td>  {/* Exibindo o campo "Priority" */}
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
