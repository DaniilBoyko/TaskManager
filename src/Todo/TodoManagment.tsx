import React, { useEffect } from "react";
import TodoList from "./TodoList";
import AddTodoItem from "./AddTodoItem";
import { TodoItemModel } from "./TodoItem";

function TodoManagment() {
  const [todoItems, setTodoItems] = React.useState<Array<TodoItemModel>>([]);

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos?_limit=5")
      .then((response) => response.json())
      .then((todos: Array<any>) => {
        const items = todos.map<TodoItemModel>((t: any) => {
          return {
            id: t.id,
            label: t.title,
            isCompleted: t.isCompleted,
            dueDate: new Date(),
          };
        });
        setTodoItems(items);
      });
  }, []);

  const addTodoItem = (label: string, dueDate: Date) => {
    const newTodo = { id: getNextTodoId(), label, isCompleted: false, dueDate };
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
