import React, { useLayoutEffect } from "react";
import { ApiActions } from "./apiActions";
import { useApiReducer } from "./useApiReducer";

export function useApi(dispatch?: React.Dispatch<ApiActions>) {
  const [, apiDispatch] = useApiReducer();

  useLayoutEffect(() => {
    if (dispatch) {
      return apiDispatch.subscribe(dispatch);
    }
    return () => {};
  });

  function execute(link: string, method: string, routeName: string) {
    const route: string = `${routeName.toUpperCase()}_${method.toUpperCase()}`;

    apiDispatch({
      type: `${route.toUpperCase()}_REQ` as any,
    });

    fetch(link)
      .then((response) => response.json())
      .then((data) => {
        apiDispatch({
          type: `${route.toUpperCase()}_RES` as any,
          payload: data,
        });
      });
  }

  return execute;
}
