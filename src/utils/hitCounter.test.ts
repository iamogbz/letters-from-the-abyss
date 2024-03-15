import { isPageLocallyLiked, logPageVisit, logPoemLike } from "./hitCounter";

const windowLocationHref = window.location.href;
const errorSpy = jest.spyOn(console, "error");
const fetchSpy = jest.spyOn(window, "fetch");

beforeEach(() => {
  errorSpy.mockImplementation(() => undefined);
  fetchSpy.mockResolvedValue(new Response());
  window.location.href = windowLocationHref;
  window.localStorage.clear();
});

afterEach(() => {
  jest.resetAllMocks();
});

describe("logPageVisit", () => {
  it.each`
    hash           | expected
    ${""}          | ${"home"}
    ${"#somehash"} | ${"somehash"}
    ${"otherhash"} | ${"otherhash"}
  `(
    "calls get on correct api",
    async (params: { hash: string; expected: string }) => {
      window.location.hash = params.hash;
      expect(fetchSpy).not.toHaveBeenCalled();
      await logPageVisit();
      expect(errorSpy).not.toHaveBeenCalled();
      expect(fetchSpy).toHaveBeenCalledTimes(1);
      expect(fetchSpy).toHaveBeenLastCalledWith(
        `https://api.letters-from-the-abyss.com/counter/page-visit-hash-${params.expected}`
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
      "https://api.letters-from-the-abyss.com/counter/page-visit-hash-home"
    );
  });
});

describe("logPoemLike", () => {
  it.each`
    hash           | expected
    ${""}          | ${"home"}
    ${"#somehash"} | ${"somehash"}
    ${"otherhash"} | ${"otherhash"}
  `(
    "calls get on correct api",
    async (params: { hash: string; expected: string }) => {
      window.location.hash = params.hash;
      expect(fetchSpy).not.toHaveBeenCalled();
      expect(isPageLocallyLiked()).toBeFalsy();
      await logPoemLike();
      expect(isPageLocallyLiked()).toBeTruthy();
      expect(errorSpy).not.toHaveBeenCalled();
      expect(fetchSpy).toHaveBeenCalledTimes(1);
      expect(fetchSpy).toHaveBeenLastCalledWith(
        `https://api.letters-from-the-abyss.com/counter/poem-like-hash-${params.expected}`
      );
    }
  );

  it("handles error without updating local storage when fetch fails", async () => {
    const mockError = new Error("mock error");
    fetchSpy.mockRejectedValue(mockError);
    expect(errorSpy).not.toHaveBeenCalled();
    expect(isPageLocallyLiked()).toBeFalsy();
    await logPoemLike();
    expect(isPageLocallyLiked()).toBeFalsy();
    expect(errorSpy).toHaveBeenCalledWith(mockError);
    expect(fetchSpy).toHaveBeenCalledWith(
      "https://api.letters-from-the-abyss.com/counter/poem-like-hash-home"
    );
  });
});
