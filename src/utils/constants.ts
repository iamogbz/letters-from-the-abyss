export const Colors = {
  DARK: "#121212",
  LIGHT: "#EDEDED",
} as const;

export const FETCH_STATUS = {
  FAILURE: "error",
  SUCCESS: "completed",
  WAITING: "pending",
} as const;
export type FetchStatus = (typeof FETCH_STATUS)[keyof typeof FETCH_STATUS]
