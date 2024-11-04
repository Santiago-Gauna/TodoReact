import { useState } from "react";
import classes from "../central.module.css";

const AddTodoForm = () => {
  // Estados para cada campo necesario en el JSON
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [creator, setCreator] = useState("");
  const [isCompleted, setIsCompleted] = useState(false);

  // Función para manejar el envío
  const handleAddTodo = () => {
    // Crea el objeto de la nueva tarea con la estructura correcta
    const newTodo = {
      name: name,
      isCompleted: isCompleted,
      description: description,
      creator: creator,
    };

    // Hace la solicitud POST al servidor JSON
    fetch("http://localhost:3000/todos", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTodo),
    });
    setName("");
    setDescription("");
    setCreator("");
    setIsCompleted("");
  };

  return (
    <div className={classes.container}>
      <h1 className={classes.title}>Añade las Tareas a Completar 💪</h1>
      <div className={classes.adddiv}>
        <input
          type="text"
          className={classes.input}
          placeholder="Escribe el nombre de la tarea"
          value={name}
          onChange={(e) => setName(e.target.value)} // Actualiza el estado para name
        />
        <input
          type="text"
          className={classes.input}
          placeholder="Escribe una breve descripcion"
          value={description}
          onChange={(e) => setDescription(e.target.value)} // Actualiza el estado para description
        />
        <input
          type="text"
          className={classes.input}
          placeholder="Creador de la tarea"
          value={creator}
          onChange={(e) => setCreator(e.target.value)} // Actualiza el estado para creator
        />
        <label>
          <input
            type="checkbox"
            checked={isCompleted}
            onChange={(e) => setIsCompleted(e.target.checked)} // Actualiza el estado para isCompleted
          />
          ¿Tarea Completa?
        </label>

        <button className={classes.button} onClick={handleAddTodo}>
          Agrega tu tarea
        </button>
      </div>
    </div>
  );
};

export default AddTodoForm;
