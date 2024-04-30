import React from "react";
import { useInterval } from "./useInterval";

/**
 * From a getter function always return the most recent value
 * by calling the getting to updates at regular intervals.
 * @param query value getter
 * @returns the most recent value result of the query
 */
export function useValue<T>(query: () => T): T {
  const [v, setV] = React.useState<T>(query);
  useInterval(() => setV(query()));
  return v;
}
