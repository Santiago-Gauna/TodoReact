import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import AddTodoForm from "./Task/AddTodoForm";
import TodoList from "./TaskList/TodoList";
import classes from "./central.module.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <h1 className={classes.title}>¡¡¡To Do Con React!!!</h1>
    <AddTodoForm />
    <TodoList />
  </StrictMode>
);
