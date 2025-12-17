import {
  isPageLocallyLiked,
  logPageVisit,
  logPoemLike,
  pageKey,
} from "./hitCounter";

const windowLocation = window.location;
const errorSpy = jest.spyOn(console, "error");
const fetchSpy = jest.spyOn(window, "fetch");

beforeEach(() => {
  errorSpy.mockImplementation(() => undefined);
  fetchSpy.mockResolvedValue(new Response());
  Object.defineProperty(window, "location", {
    value: { ...windowLocation, host: 'letters-from-the-abyss.com' },
    writable: true,
  });
  window.localStorage.clear();
});

afterEach(() => {
  jest.resetAllMocks();
});

describe("pageKey", () => {
  it.each`
    pathSuffix | expected
    ${""}      | ${"/visit-hash"}
    ${"main/"} | ${"/visit-hash"}
    ${"test/"} | ${"/test/visit-hash"}
  `(
    "excludes main branch from generated key",
    (params: { pathSuffix: string; expected: string }) => {
      const part = "visit";
      const targetPath = window.location.pathname + params.pathSuffix;
      window.location.pathname = targetPath;
      expect(pageKey(part)).toEqual(params.expected);
    }
  );
});

describe.skip("logPageVisit", () => {
  it.each`
    hash           | expected
    ${""}          | ${""}
    ${"#somehash"} | ${"-somehash"}
    ${"otherhash"} | ${"-otherhash"}
  `(
    "calls get on correct api",
    async (params: { hash: string; expected: string }) => {
      window.location.hash = params.hash;
      expect(fetchSpy).not.toHaveBeenCalled();
      await logPageVisit();
      expect(errorSpy).not.toHaveBeenCalled();
      expect(fetchSpy).toHaveBeenCalledTimes(1);
      expect(fetchSpy).toHaveBeenLastCalledWith(
        `https://api.letters-from-the-abyss.com/counter/page-visit-hash${params.expected}`
      );
    }
  );

  it("handles error when fetch fails", async () => {
    const mockError = new Error("mock error");
    fetchSpy.mockRejectedValue(mockError);
    expect(errorSpy).not.toHaveBeenCalled();
    await logPageVisit();
    expect(errorSpy).toHaveBeenCalledWith(mockError);
    expect(fetchSpy).toHaveBeenCalledWith(
      "https://api.letters-from-the-abyss.com/counter/page-visit-hash"
    );
  });
});

describe("logPoemLike", () => {
  it.each`
    hash           | expected
    ${""}          | ${""}
    ${"#somehash"} | ${"-somehash"}
    ${"otherhash"} | ${"-otherhash"}
  `(
    "calls get on correct api",
    async (params: { hash: string; expected: string }) => {
      window.location.hash = params.hash;
      expect(fetchSpy).not.toHaveBeenCalled();
      expect(isPageLocallyLiked()).toBeFalsy();
      await logPoemLike();
      expect(isPageLocallyLiked()).toBeTruthy();
      expect(errorSpy).not.toHaveBeenCalled();
    //   expect(fetchSpy).toHaveBeenCalledTimes(1);
    //   expect(fetchSpy).toHaveBeenLastCalledWith(
    //     `https://api.letters-from-the-abyss.com/counter/poem-like-hash${params.expected}`
    //   );
    }
  );

  it.skip("handles error without updating local storage when fetch fails", async () => {
    const mockError = new Error("mock error");
    fetchSpy.mockRejectedValue(mockError);
    expect(errorSpy).not.toHaveBeenCalled();
    expect(isPageLocallyLiked()).toBeFalsy();
    await logPoemLike();
    expect(isPageLocallyLiked()).toBeFalsy();
    expect(errorSpy).toHaveBeenCalledWith(mockError);
    expect(fetchSpy).toHaveBeenCalledWith(
      "https://api.letters-from-the-abyss.com/counter/poem-like-hash"
    );
  });
});
