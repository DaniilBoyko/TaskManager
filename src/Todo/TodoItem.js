import React from "react";
import PropTypes from "prop-types";

const styles = {
  todoItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: "10px",
  },
  label: {
    marginLeft: "5px",
  },
  expiredItem: {
    backgroundColor: "#ff9999",
  },
  completedItem: {
    textDecoration: "line-through",
  },
};

function TodoItem(props) {
  const { todo, onRemoveItem, onChange } = props;
  const isItemExpired =
    new Date(
      todo.dueDate.getFullYear(),
      todo.dueDate.getMonth(),
      todo.dueDate.getDate() + 1
    ) < new Date();

  const expiredItemStyles =
    isItemExpired && !todo.isCompleted ? styles.expiredItem : {};
  const completedItemStyles = todo.isCompleted ? styles.completedItem : {};

  return (
    <div style={styles.todoItem}>
      <input
        style={styles.input}
        type="checkbox"
        checked={todo.isCompleted}
        onChange={() => onChange(todo.id)}
      />
      <label
        style={{
          ...styles.label,
          ...expiredItemStyles,
          ...completedItemStyles,
        }}
      >
        {todo.label} ({todo.dueDate.toDateString()})
      </label>
      <button className="remove-btn" onClick={() => onRemoveItem(todo.id)}>
        &times;
      </button>
    </div>
  );
}

TodoItem.propTypes = {
  onRemoveItem: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  todo: PropTypes.shape({
    id: PropTypes.number.isRequired,
    label: PropTypes.string.isRequired,
    dueDate: PropTypes.instanceOf(Date).isRequired,
    isCompleted: PropTypes.bool.isRequired,
  }),
};

export default TodoItem;
