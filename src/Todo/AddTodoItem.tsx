import React from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

const styles = {
  addTodoItem: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: "40px",
  },
  inputBlock: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginTop: "8px",
    width: "300px",
  },
  label: {
    width: "100px",
  },
  addBtn: {
    marginTop: "10px",
  },
};

export type AddTodoItemProps = {
  addTodoItem: (title: string, dueDate: Date) => any;
};

const AddTodoItem: React.FC<AddTodoItemProps> = (props) => {
  const { addTodoItem } = props;
  const [todoTitle, setTodoTitle] = React.useState("");
  const [todoDueDate, setTodoDueDate] = React.useState(new Date());

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
    <div style={styles.addTodoItem as React.CSSProperties}>
      <div style={styles.inputBlock as React.CSSProperties}>
        <label style={styles.label}>Title:</label>
        <input
          className="form-control"
          type="text"
          value={todoTitle}
          onChange={(e) => setTodoTitle(e.target.value)}
        ></input>
      </div>
      <div style={styles.inputBlock as React.CSSProperties}>
        <label style={styles.label}>Due Date:</label>
        <DatePicker
          className="form-control"
          selected={todoDueDate}
          onChange={(date: any) => setTodoDueDate(date)}
        />
      </div>
      <button
        className="btn btn-primary"
        style={styles.label}
        onClick={handleAdd}
      >
        Add Todo
      </button>
    </div>
  );
};

export default AddTodoItem;
