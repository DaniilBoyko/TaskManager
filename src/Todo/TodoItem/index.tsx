import React from "react";
import useStyles from "./useTodoItemStyles";

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
