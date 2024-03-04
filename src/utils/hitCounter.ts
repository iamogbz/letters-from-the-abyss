export function logPageVisit() {
  const pathWithHash = `${
    window.location.pathname
  }page-visit-hash-${window.location.hash.replace("#", "")}`;
  const input = `https://api.letters-from-the-abyss.com/counter${pathWithHash}`;
  console.log(input);
  fetch(input);
}
