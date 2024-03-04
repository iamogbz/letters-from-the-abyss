export const Keys = {
  PAGE_VISIT: "page-visit",
  POEM_LIKE: "poem-like",
};

export function pageKey(part: string) {
  const pathWithHash = `${
    window.location.pathname
  }${part}-hash-${window.location.hash.replace("#", "")}`;
  return pathWithHash;
}

export function apiLogCount(countKey: string) {
  return `https://api.letters-from-the-abyss.com/counter${countKey}`;
}

export function logPageVisit() {
  fetch(apiLogCount(pageKey(Keys.PAGE_VISIT)));
}

export function isPageLocallyLiked() {
  const likey = pageKey(Keys.POEM_LIKE);
  try {
    return JSON.parse(window.localStorage.getItem(likey) || "false");
  } catch {
    return false;
  }
}

export function logPoemLike() {
  const likey = pageKey(Keys.POEM_LIKE);
  fetch(apiLogCount(likey));
  window.localStorage.setItem(likey, "true");
}
