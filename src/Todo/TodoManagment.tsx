import React from "react";
import TodoList from "./TodoList";
import AddTodoItem from "./AddTodoItem";
import { TodoItemModel } from "./TodoItem";

const initialTodoItems: Array<TodoItemModel> = [
  {
    id: 1,
    label: "Todo Item 1",
    dueDate: new Date(2021, 4, 3),
    isCompleted: true,
  },
  {
    id: 2,
    label: "Todo Item 2",
    dueDate: new Date(2021, 3, 4),
    isCompleted: false,
  },
];

function TodoManagment() {
  const [todoItems, setTodoItems] = React.useState(initialTodoItems);

  const addTodoItem = (label: string, dueDate: Date) => {
    const newTodo: TodoItemModel = {
      id: getNextTodoId(),
      label,
      dueDate,
      isCompleted: false,
    };
    setTodoItems((prevTodos) => [newTodo, ...prevTodos]);
  };

  const removeTodoItem = (id: number) => {
    setTodoItems((prevTodoItems) =>
      prevTodoItems.filter((item) => item.id !== id)
    );
  };

  const toggleTodo = (id: number) => {
    setTodoItems((prevTodos) =>
      prevTodos.map((todo) => {
        if (todo.id === id) {
          todo = { ...todo, isCompleted: !todo.isCompleted };
        }
        return todo;
      })
    );
  };

  const getNextTodoId = () => {
    const ids = todoItems.map((item) => item.id);
    return ids.length > 0 ? Math.max.apply(null, ids) + 1 : 1;
  };

  return (
    <div>
      <AddTodoItem addTodoItem={addTodoItem} />
      {todoItems.length ? (
        <TodoList
          todoItems={todoItems}
          removeItem={removeTodoItem}
          onToggle={toggleTodo}
        />
      ) : (
        <p>No Todos!</p>
      )}
    </div>
  );
}

export default TodoManagment;
