import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Todo from "../components/Todo";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { __getTodos } from "../redux/modules/todos";

function Complete() {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const deleteTodo = async (id) => {
    await axios.delete(`http://localhost:8000/todos/${id}`);
    dispatch(__getTodos());
  };

  const completeTodo = async (todo) => {
    await axios.patch(`http://localhost:8000/todos/${todo.id}`, {
      ...todo,
      isDone: false,
    });
    dispatch(__getTodos());
  };

  return (
    <div
      style={{
        overflow: "auto",
        maxHeight: 800,
        maxWidth: 1200,
      }}
    >
      <button onClick={() => navigate("/")}>Go Home</button>
      {todos.todos.map((todo) => {
        if (todo.isDone) {
          return (
            <Todo
              key={todo.id}
              todo={todo}
              deleteTodo={deleteTodo}
              completeTodo={completeTodo}
            />
          );
        } else {
          return null;
        }
      })}
    </div>
  );
}

export default Complete;
