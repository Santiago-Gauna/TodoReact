import { useEffect, useState } from "react";
import classes from "../central.module.css";

const TodoItem = ({ filter }) => {
  const [todos, setTodos] = useState([]);
  const [selectedTodo, setSelectedTodo] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Obtener datos de JSON Server
  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const response = await fetch("http://localhost:3000/todos");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setTodos(data);
      } catch (error) {
        console.error("There was a problem with the fetch operation:", error);
      }
    };

    fetchTodos();
  });

  // Filtrar las tareas según el filtro seleccionado en el componente padre
  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") return todo.isCompleted;
    if (filter === "pending") return !todo.isCompleted;
    return true;
  });

  // Función para abrir el modal con la tarea seleccionada
  const openModal = (todo) => {
    setSelectedTodo(todo);
    setShowModal(true);
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setShowModal(false);
    setSelectedTodo(null);
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/todos/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Error deleting the todo");
      }
      setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error("There was a problem with the delete operation:", error);
    }
  };

  return (
    <div className={classes.lidiv}>
      {filteredTodos.map((todo) => (
        <div key={todo.id} className={classes.itemli}>
          <div
            className={classes.itemdiv}
            onClick={() => openModal(todo)}
            style={{ cursor: "pointer" }}
          >
            <input type="checkbox" defaultChecked={todo.isCompleted} />
            <p>{todo.name}</p>
          </div>
          <button
            className={classes.button}
            onClick={() => handleDelete(todo.id)}
            type="button"
          >
            Eliminar
          </button>
        </div>
      ))}

      {showModal && selectedTodo && (
        <div className={classes.modalOverlay}>
          <div className={classes.modalContent}>
            <h2>{selectedTodo.name}</h2>
            <p>
              <strong>Descripción:</strong> {selectedTodo.description}
            </p>
            <p>
              <strong>Creador:</strong> {selectedTodo.creator}
            </p>
            <button onClick={closeModal} className={classes.closeButton}>
              Cerrar
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoItem;
