import React from "react";
import DatePicker from "react-datepicker";
import PropTypes from "prop-types";

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
    label: {
      width: "100px",
    },
  },
  addBtn: {
    marginTop: "10px",
  },
};

function AddTodoItem(props) {
  const { addTodoItem } = props;
  const [todoTitle, setTodoTitle] = React.useState("");
  const [todoDueDate, setTodoDueDate] = React.useState(new Date());

  const handleTitleChange = (event) => {
    setTodoTitle(event.target.value);
  };

  const handleAdd = (event) => {
    event.preventDefault();

    if (todoTitle.trim()) {
      addTodoItem(todoTitle, getShortDate(todoDueDate));
      setTodoTitle("");
      setTodoDueDate(new Date());
    }
  };

  const getShortDate = (date) => {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  };

  return (
    <div style={styles.addTodoItem}>
      <div style={styles.inputBlock}>
        <label style={styles.inputBlock.label}>Title:</label>
        <input
          className="form-control"
          type="text"
          value={todoTitle}
          onChange={handleTitleChange}
        ></input>
      </div>
      <div style={styles.inputBlock}>
        <label style={styles.inputBlock.label}>Due Date:</label>
        <DatePicker
          className="form-control"
          selected={todoDueDate}
          onChange={(date) => setTodoDueDate(date)}
        />
      </div>
      <button
        className="btn btn-primary"
        style={styles.addBtn}
        onClick={handleAdd}
      >
        Add Todo
      </button>
    </div>
  );
}

AddTodoItem.propTypes = {
  addTodoItem: PropTypes.func.isRequired,
};

export default AddTodoItem;
