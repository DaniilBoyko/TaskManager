import {createUseStyles} from "react-jss";
import {TodoItemProps, TodoItemModel} from ".";

export default createUseStyles<string, TodoItemProps>({
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