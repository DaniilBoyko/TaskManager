import React from "react";
import TodoItem from "./TodoItem";

function TodoList(props) {
  const { todoItems, removeItem, onToggle } = props;

  return (
    <div>
      {todoItems.map((todoItem) => (
        <TodoItem
          key={todoItem.id}
          todo={todoItem}
          removeItem={removeItem}
          onChange={onToggle}
        />
      ))}
    </div>
  );
}

export default TodoList;
