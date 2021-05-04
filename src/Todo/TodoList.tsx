import React from "react";
import TodoItem, { TodoItemModel } from "./TodoItem";

export type TodoListProps = {
  removeItem: (id: number) => any;
  onToggle: (id: number) => any;
  todoItems: Array<TodoItemModel>;
};

const TodoList: React.FC<TodoListProps> = (props) => {
  const { todoItems, removeItem, onToggle } = props;

  return (
    <div>
      {todoItems.map((todoItem) => (
        <TodoItem
          key={todoItem.id}
          todo={todoItem}
          onRemoveItem={removeItem}
          onChange={onToggle}
        />
      ))}
    </div>
  );
};

export default TodoList;
