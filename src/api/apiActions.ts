import { TodoItemDto } from "./apiSchema";

export type ApiActions =
  | {
      type: "TODO_GET_REQ";
    }
  | {
      type: "TODO_GET_RES";
      payload: Array<TodoItemDto>;
    };
