import React from "react";
import TodoItem from "./TodoItem";
import PropTypes from "prop-types";

function TodoList(props) {
  const { todoItems, removeItem, onToggle } = props;

  return (
    <div>
      {todoItems.map((todoItem) => (
        <TodoItem
          key={todoItem.id}
          todo={todoItem}
          onRemoveItem={removeItem}
          onChange={onToggle}
        />
      ))}
    </div>
  );
}

TodoList.propTypes = {
  removeItem: PropTypes.func.isRequired,
  onToggle: PropTypes.func.isRequired,
  todoItems: PropTypes.arrayOf(PropTypes.object),
};

export default TodoList;
