import { createUseStyles } from "react-jss";

export default createUseStyles({
    todoItem: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      margin: {
        top: 40,
      },
    },
    inputBlock: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      margin: {
        top: 8,
      },
      width: 300,
      "& label": {
        width: 100,
      },
    },
    addBtn: {
      margin: {
        top: 10,
      },
    },
  });
  