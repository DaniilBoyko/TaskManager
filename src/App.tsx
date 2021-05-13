import React from "react";
import TodoManagment from "./Todo/TodoManagment";
import { ApiReducerProvider } from "./api/useApiReducer";

function App() {
  return (
    <ApiReducerProvider>
      <TodoManagment />
    </ApiReducerProvider>
  );
}

export default App;
