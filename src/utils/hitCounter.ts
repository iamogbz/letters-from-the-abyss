export const Keys = {
  PAGE_VISIT: "page-visit",
  POEM_LIKE: "poem-like",
};

const MAIN_BRANCH = "main";

export function pageKey(part: string) {
  const mainPathBranch = `/${MAIN_BRANCH}`;
  const path = window.location.pathname.replace(mainPathBranch, "");
  const pathWithHash = [
    `${path}${part}`,
    "hash",
    window.location.hash.replace("#", ""),
  ]
    .filter(Boolean)
    .join("-");
  return pathWithHash;
}

export function apiLogCount(countKey: string) {
  return `https://api.letters-from-the-abyss.com/counter${countKey}`;
}

export async function logPageVisit() {
  try {
    await fetch(apiLogCount(pageKey(Keys.PAGE_VISIT)));
  } catch (e) {
    console.error(e);
  }
}

export function isPageLocallyLiked() {
  const likey = pageKey(Keys.POEM_LIKE);
  try {
    return JSON.parse(window.localStorage.getItem(likey) || "false");
  } catch {
    return false;
  }
}

export async function logPoemLike() {
  const likey = pageKey(Keys.POEM_LIKE);
  try {
    await fetch(apiLogCount(likey));
    window.localStorage.setItem(likey, "true");
  } catch (e) {
    console.error(e);
  }
}
