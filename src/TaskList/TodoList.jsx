import TodoItem from "./TodoItem";
import classes from "../central.module.css";
import { useState } from "react";

const TodoList = () => {
  const [filter, setFilter] = useState("all");

  const showallTasks = () => setFilter("all");
  const showCompletedTasks = () => setFilter("completed");
  const showPendingTasks = () => setFilter("pending");

  //Funcion para eliminar todas las tareas
  const deleteAllTasks = async () => {
    try {
      const response = await fetch("http://localhost:3000/todos");
      const todos = await response.json();

      // Eliminar cada tarea en el servidor
      await Promise.all(
        todos.map((todo) =>
          fetch(`http://localhost:3000/todos/${todo.id}`, {
            method: "DELETE",
          })
        )
      );
      setFilter("all");
    } catch (error) {
      console.log("Hubo un problema al eliminar todas las tareas:", error);
    }
  };

  return (
    <div className={classes.todolist}>
      <div className={classes.div}>
        <button className={classes.tbutton} onClick={showallTasks}>
          Todas las Tareas
        </button>
        <button className={classes.tbutton} onClick={showCompletedTasks}>
          Tareas Completas
        </button>
        <button className={classes.tbutton} onClick={showPendingTasks}>
          Tareas Pendientes
        </button>
        <button className={classes.tbutton} onClick={deleteAllTasks}>
          Borrar Todas las tareas
        </button>
      </div>
      <TodoItem filter={filter} />
    </div>
  );
};

export default TodoList;
