export const Colors = {
  DARK: "var(--color-bg)",
  LIGHT: "var(--color-fg)",
} as const;

export const FETCH_STATUS = {
  FAILURE: "error",
  SUCCESS: "completed",
  WAITING: "pending",
} as const;
export type FetchStatus = (typeof FETCH_STATUS)[keyof typeof FETCH_STATUS]

export const MAIN_BRANCH = "main";
