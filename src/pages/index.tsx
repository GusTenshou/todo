import { useState } from "react";
import { useToDos } from "@/hooks";

const App: React.FC = () => {
  const {
    todos,
    addTodo,
    deleteTodo,
    updateTodoById, // Função para atualizar a ToDo
  } = useToDos();

  // Estados locais para manter os valores do formulário
  const [Name, setName] = useState<string>("");
  const [Description, setDescription] = useState<string>("");
  const [DateStart, setDateStart] = useState<string>("");
  const [DateEnd, setDateEnd] = useState<string>("");
  const [Priority, setPriority] = useState<string>("Low");
  const [isEditing, setIsEditing] = useState<boolean>(false); // Define se está editando
  const [editId, setEditId] = useState<number | null>(null); // ID da tarefa que está sendo editada

  // Função para lidar com a adição ou atualização de um ToDo
  const handleAddOrUpdateTodo = () => {
    if (isEditing && editId !== null) {
      // Se estiver no modo de edição, atualiza a tarefa
      updateTodoById(editId, Name, Description, DateStart, DateEnd, Priority);
      setIsEditing(false);
      setEditId(null);
    } else {
      // Caso contrário, adiciona um novo ToDo
      if (Name && Description && DateStart && DateEnd && Priority) {
        addTodo(Name, Description, DateStart, DateEnd, Priority);
      } else {
        alert("Please fill in all fields.");
        return;
      }
    }

    setName("");
    setDescription("");
    setDateStart("");
    setDateEnd("");
    setPriority("Low");
  };

  const handleEditTodo = (todo: any) => {
    if (isEditing && editId === todo.id) {
      setIsEditing(false);
      setEditId(null);
      setName("");
      setDescription("");
      setDateStart("");
      setDateEnd("");
      setPriority("Low");
    } else {
      setName(todo.Name);
      setDescription(todo.Description);
      setDateStart(todo.DateStart);
      setDateEnd(todo.DateEnd);
      setPriority(todo.Priority);
      setIsEditing(true);
      setEditId(todo.id);
    }
  };

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
        <button onClick={handleAddOrUpdateTodo}>
          {isEditing ? "Update To Do" : "Add To Do"}
        </button>
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
              <td>{todo.Name}</td> {/* Exibindo o campo "Name" */}
              <td>{todo.Description}</td> {/* Exibindo o campo "Description" */}
              <td>{todo.DateStart}</td> {/* Exibindo o campo "DateStart" */}
              <td>{todo.DateEnd}</td> {/* Exibindo o campo "DateEnd" */}
              <td>{todo.Priority}</td> {/* Exibindo o campo "Priority" */}
              <td>
                <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                <button onClick={() => handleEditTodo(todo)}>
                  {isEditing && editId === todo.id ? "Cancel" : "Edit"}
                </button>
                {/* O botão alterna entre "Cancel" e "Edit" */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;
