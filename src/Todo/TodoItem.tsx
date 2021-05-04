import React from "react";

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

export type TodoItemModel = {
  id: number;
  label: string;
  isCompleted: boolean;
  dueDate: Date;
};

export type TodoItemProps = {
  onRemoveItem: (id: number) => any;
  onChange: (id: number) => any;
  todo: TodoItemModel;
};

const TodoItem: React.FC<TodoItemProps> = (props) => {
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
    <div style={styles.todoItem as React.CSSProperties}>
      <input
        type="checkbox"
        checked={todo.isCompleted}
        onChange={() => onChange(todo.id)}
      />
      <label
        style={
          {
            ...styles.label,
            ...expiredItemStyles,
            ...completedItemStyles,
          } as React.CSSProperties
        }
      >
        {todo.label} ({todo.dueDate.toDateString()})
      </label>
      <button className="remove-btn" onClick={() => onRemoveItem(todo.id)}>
        &times;
      </button>
    </div>
  );
};

export default TodoItem;
