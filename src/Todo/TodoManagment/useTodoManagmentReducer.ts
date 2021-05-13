import React, { useReducer } from "react";
import { ApiActions } from "../../api/apiActions";
import { TodoItemModel } from "../TodoItem/index";
import { useApi } from "../../api/useApi";

type TodoManagmentState = {
  todoItems: Array<TodoItemModel>;
};

const initState: TodoManagmentState = {
  todoItems: [],
};

export type TodoManagmentActions =
  | {
      type: "ADD_TODO_ITEM";
      payload: { title: string; dueDate: Date };
    }
  | {
      type: "REMOVE_TODO_ITEM";
      payload: { id: number };
    }
  | {
      type: "TOGGLE_TODO_ITEM";
      payload: { id: number };
    };

export default function useTodoManagmentReducer(): [
  TodoManagmentState,
  React.Dispatch<TodoManagmentActions | ApiActions>
] {
  const [newState, dispatch] = useReducer(
    (state: TodoManagmentState, action: TodoManagmentActions | ApiActions) => {
      switch (action.type) {
        case "ADD_TODO_ITEM": {
          const newTodo = {
            id: getNextTodoId(state.todoItems),
            label: action.payload.title,
            isCompleted: false,
            dueDate: action.payload.dueDate,
          };

          return {
            todoItems: [newTodo, ...state.todoItems],
          };
        }
        case "REMOVE_TODO_ITEM": {
          return {
            todoItems: state.todoItems.filter(
              (item) => item.id !== action.payload.id
            ),
          };
        }
        case "TOGGLE_TODO_ITEM": {
          const nextTodos = state.todoItems.map((todo) => {
            if (todo.id === action.payload.id) {
              todo = { ...todo, isCompleted: !todo.isCompleted };
            }
            return todo;
          });

          return {
            todoItems: nextTodos,
          };
        }
        case "TODO_GET_RES": {
          return {
            todoItems: action.payload.map((todoDto) => {
              return {
                id: todoDto.id,
                label: todoDto.title,
                isCompleted: todoDto.isCompleted,
                dueDate: new Date(),
              };
            }),
          };
        }
      }
      return state;
    },
    { ...initState }
  );
  useApi(dispatch);

  return [newState, dispatch];
}

const getNextTodoId = (todoItems: Array<TodoItemModel>) => {
  const ids = todoItems.map((item) => item.id);
  return ids.length > 0 ? Math.max.apply(null, ids) + 1 : 1;
};
