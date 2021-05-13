import React from "react";
import TodoList from "../TodoList";
import AddTodoItem from "../AddTodoItem";
import useTodoManagmentReducer from "./useTodoManagmentReducer";

const TodoManagment: React.FC = () => {
  const [state, dispatch] = useTodoManagmentReducer();

  const addTodo = (title: string, dueDate: Date) => {
    dispatch({
      type: "ADD_TODO_ITEM",
      payload: {
        title,
        dueDate,
      },
    });
  };

  const removeTodo = (id: number) => {
    dispatch({
      type: "REMOVE_TODO_ITEM",
      payload: {
        id,
      },
    });
  };

  const toggleTodo = (id: number) => {
    dispatch({
      type: "TOGGLE_TODO_ITEM",
      payload: {
        id,
      },
    });
  };

  return (
    <div>
      <AddTodoItem addTodoItem={addTodo} />
      {state.todoItems.length ? (
        <TodoList
          todoItems={state.todoItems}
          removeItem={removeTodo}
          onToggle={toggleTodo}
        />
      ) : (
        <p>No Todos!</p>
      )}
    </div>
  );
};

export default TodoManagment;
