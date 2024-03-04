import { randomUUID } from "crypto";

const LOCAL_ID_KEY = "letters-from-the-abyss-local-id";

/**
 * Get the unique id for this particular system stored locally.
 * @returns {string}
 */
export function localId() {
  let lId = window.localStorage.getItem(LOCAL_ID_KEY);
  if (!lId) {
    lId = randomUUID();
    window.localStorage.setItem(LOCAL_ID_KEY, lId);
  }
  return lId;
}
