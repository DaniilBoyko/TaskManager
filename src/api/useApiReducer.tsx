import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
} from "react";
import { ApiActions } from "./apiActions";
import { globalHistory } from "@reach/router";
import { useApi } from "./useApi";

let subscriptions: React.Dispatch<ApiActions>[] = [];

export type ApiState = {
  route: string | undefined;
};

export type ApiDispatch = React.Dispatch<ApiActions> & {
  subscribe: (dispatch: React.Dispatch<ApiActions>) => () => void;
};

export type ApiReducerContextType = [ApiState, ApiDispatch];

const initApiState: ApiState = {
  route: undefined,
};

const initApiDispatch = () => {
  console.warn(
    "ApiAction dispatched but there is no API context. Add ApiProvider to the root of the component tree."
  );
};
initApiDispatch.subscribe = () => {
  console.warn(
    "ApiAction subscribed but there is no API context. Add ApiProvider to the root of the component tree."
  );
  return () => {};
};

export const ApiReducerContext = createContext<ApiReducerContextType>([
  initApiState,
  initApiDispatch,
]);

export function useApiReducer(): [ApiState, ApiDispatch] {
  const [state, dispatch] = useContext(ApiReducerContext);
  return [state, dispatch];
}

function useApiReducerRoot(): [ApiState, ApiDispatch] {
  const [newState, dispatch] = useReducer(
    (state: ApiState, apiAction: ApiActions) => {
      return state;
    },
    initApiState
  );

  const memoDispatch = useMemo(() => {
    const broadcastDispatch = (action: ApiActions) => {
      dispatch(action);

      for (const subscription of subscriptions) {
        subscription(action);
      }
    };
    broadcastDispatch.subscribe = (
      dispatchDelegate: React.Dispatch<ApiActions>
    ) => {
      subscriptions.push(dispatchDelegate);
      return () => {
        subscriptions = subscriptions.filter((s) => s !== dispatchDelegate);
      };
    };
    return broadcastDispatch;
  }, []);

  return [newState, memoDispatch];
}

export const ApiReducerProvider: React.FC = ({ children }) => {
  const [state, dispatch] = useApiReducerRoot();

  return (
    <ApiReducerContext.Provider value={[state, dispatch]}>
      <NavProvider>{children}</NavProvider>
    </ApiReducerContext.Provider>
  );
};

const NavProvider: React.FC = ({ children }) => {
  const execute = useApi();

  useEffect(() => {
    if (globalHistory.location != null) {
      execute(
        "https://jsonplaceholder.typicode.com/todos?_limit=5",
        "GET",
        "TODO"
      );
    }
  });

  return <>{children}</>;
};
