import React from "react";
import DatePicker from "react-datepicker";
import useStyles from "./useAddTodoItemStyles";

import "react-datepicker/dist/react-datepicker.css";

export type AddTodoItemProps = {
  addTodoItem: (title: string, dueDate: Date) => any;
};

const AddTodoItem: React.FC<AddTodoItemProps> = (props) => {
  const { addTodoItem } = props;
  const [todoTitle, setTodoTitle] = React.useState("");
  const [todoDueDate, setTodoDueDate] = React.useState(new Date());
  const classes = useStyles();

  const handleAdd = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();

    if (todoTitle.trim()) {
      addTodoItem(todoTitle, getShortDate(todoDueDate));
      setTodoTitle("");
      setTodoDueDate(new Date());
    }
  };

  const getShortDate = (date: Date) => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  };

  return (
    <div className={classes.todoItem}>
      <div className={classes.inputBlock}>
        <label>Title:</label>
        <input
          className="form-control"
          type="text"
          value={todoTitle}
          onChange={(e) => setTodoTitle(e.target.value)}
        ></input>
      </div>
      <div className={classes.inputBlock}>
        <label>Due Date:</label>
        <DatePicker
          className="form-control"
          selected={todoDueDate}
          onChange={(date: any) => setTodoDueDate(date)}
        />
      </div>
      <button
        className={"btn btn-primary " + classes.addBtn}
        onClick={handleAdd}
      >
        Add Todo
      </button>
    </div>
  );
};

export default AddTodoItem;
