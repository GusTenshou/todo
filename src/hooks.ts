import { useEffect, useState } from "react";
import { Todo } from "./types";

export function useToDos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [lastUpdate, setLastUpdate] = useState<number>(1);

  // Função para buscar todos os ToDos (renomeada para fetchAllTodos)
  const fetchAllTodos = async () => {
    try {
      const response = await fetch("/api/todo");
      const data: Todo[] = await response.json();
      setTodos(data);
    } catch (error) {
      console.error("Error fetching ToDos:", error);
    }
  };

  const addTodo = async (
    Name: string,
    Description: string,
    DateStart: string,
    DateEnd: string,
    Priority: string
  ) => {
    if (Name.trim() && Description.trim() && DateStart && DateEnd && Priority) {
      try {
        const response = await fetch("/api/todo", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
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
          setLastUpdate(lastUpdate + 1); // Forçar atualização da lista
        } else {
          console.error("Error adding ToDo");
        }
      } catch (error) {
        console.error("Error adding ToDo:", error);
      }
    }
  };

  // Função para excluir um ToDo pelo ID
  const deleteTodo = async (id: number) => {
    try {
      const response = await fetch(`/api/todo?id=${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setLastUpdate(lastUpdate + 1); // Atualiza a lista após a exclusão
      } else {
        console.error("Error deleting ToDo");
      }
    } catch (error) {
      console.error("Error deleting ToDo:", error);
    }
  };

  // Função para atualizar um ToDo pelo ID, recebendo parâmetros para o novo conteúdo
  const updateTodoById = async (
    id: number,
    Name: string,
    Description: string,
    DateStart: string,
    DateEnd: string,
    Priority: string
  ) => {
    try {
      const response = await fetch(`/api/todo?id=${id}`, {
        method: "PUT", // Usando PUT para atualização completa
        headers: {
          "Content-Type": "application/json",
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
        setLastUpdate(lastUpdate + 1); // Atualiza a lista após a edição
      } else {
        console.error("Error updating ToDo");
      }
    } catch (error) {
      console.error("Error updating ToDo:", error);
    }
  };

  // Buscar todos os ToDos quando houver uma atualização
  useEffect(() => {
    fetchAllTodos();
  }, [lastUpdate]);

  return {
    todos,
    addTodo,
    deleteTodo,
    updateTodoById,
    setLastUpdate,
  };
}
