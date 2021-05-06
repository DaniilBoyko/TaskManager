import React from "react";
import { createUseStyles } from "react-jss";

const useStyles = createUseStyles<string, TodoItemProps>({
  todoItem: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    margin: {
      top: 10,
    },
  },
  label: {
    margin: {
      left: 5,
    },
    backgroundColor: (props) =>
      isTodoItemExpired(props.todo) && !props.todo.isCompleted
        ? "#ff9999"
        : "#ffffff",
    textDecoration: (props) =>
      props.todo.isCompleted ? "line-through" : "none",
  },
});

const isTodoItemExpired = (item: TodoItemModel) => {
  return (
    new Date(
      item.dueDate.getFullYear(),
      item.dueDate.getMonth(),
      item.dueDate.getDate() + 1
    ) < new Date()
  );
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
  const classes = useStyles(props);

  return (
    <div className={classes.todoItem}>
      <input
        type="checkbox"
        checked={todo.isCompleted}
        onChange={() => onChange(todo.id)}
      />
      <label className={classes.label}>
        {todo.label} ({todo.dueDate.toDateString()})
      </label>
      <button className="remove-btn" onClick={() => onRemoveItem(todo.id)}>
        &times;
      </button>
    </div>
  );
};

export default TodoItem;
